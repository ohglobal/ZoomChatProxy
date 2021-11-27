const ZOSC = require("./ZOSC")
const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { setupMaster } = require("cluster");
const io = new Server(server);
const axios = require('axios');
const fs = require('fs');

//creation of a new ZoomOSC conection
var zoscCon = null;
//Global Variable to store the chat messages in
var MSGS =[];
var AS = "";
var Questions = []
//Configuration of the Application
var Config = {}
function start(){
  //check if file exists
  console.log("fs.existsSync('settings.json'",fs.existsSync('settings.json'))
  if(fs.existsSync('settings.json')){
    var rawdata = fs.readFileSync('settings.json');
    Config = JSON.parse(rawdata);
  }
   
    if(Config.HttpPort == null){
     Config = {"HttpPort":"8080","ZoomPort":"8081","H2RAdress":"http://localhost:4001/api/ABCD/"}; 
     saveConfig(); 
    }
    server.listen(Config.HttpPort)
    zoscCon = new ZOSC(Config.ZoomPort);
    //Setup of the ZOSC Connection
    //Store Chat messages
    zoscCon.on("chat",(msg)=>{
      MSGS.push({"user":msg[2],"content":msg[5]})
      console.log(MSGS)
      axios.post(Config.H2RAdress+"updateVariableList/1/addRow",{row: [ {value: msg[2]},{value: msg[5]},{value: "ZoomChat"}]}).then((res)=>{
        console.log(res)
      })
    })
    //Store Question
    zoscCon.on("question",(msg)=>{
    Questions.push({"user":msg[2],"content":msg[5],"status":"ready"})
    console.log("qs",MSGS)
    io.emit("updateOuestions",Questions);
    axios.post(Config.H2RAdress+"updateVariableList/1/addRow",{row: [ {value: msg[2]},{value: msg[5]},{value: "ZoomQuestion"}]}).then((res)=>{
      console.log(res)
    })
    })
    //Store Active Speaker
    zoscCon.on("activeSpeaker",(msg)=>{
    console.log("as is",msg[2])
    AS = msg[2];
    })
}
function saveConfig(){
    fs.writeFileSync('settings.json', JSON.stringify(Config));
    
}
//Call to get all past Messages in a JSON format
app.get('/chat', function (req, res) {
    res.json(MSGS)
  })
  app.get('/questions', function (req, res) {
    res.json(Questions.filter((question)=>{return question.status =="selected"}))
    console.log(Questions.filter((question)=>{return question.status =="selected"}));
  })
  app.get('/allquestions', function (req, res) {
    res.json(Questions)
  })
  app.get('/as', function (req, res) {
    res.send(AS)
  })

start()