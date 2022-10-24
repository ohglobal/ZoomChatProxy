const express = require('express')
//import Bytehive/ZoomOSCJS
const {Zosc} = require('@bytehive/zoomoscjs');
const app = express();
const http = require('http');
const server = http.createServer(app);
const axios = require('axios');
const fs = require('fs');
const { uid } = require('uid');
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
     Config = {"HttpPort":"8080","ZoomPort":"8081","H2RAdress":" http://127.0.0.1:4001/data/BBNHJ360SU/"}; 
     saveConfig(); 
    }
    server.listen(Config.HttpPort)
    //start the ZoomOSC connection
    console.log("Starting ZoomOSC connection",)
    zoscCon = new Zosc("192.168.178.110",9090,1234);
    zoscCon.on("newUser",(user)=>{
      user.on("chat",(msg)=>{
        console.log("new chat message",msg,user)
        MSGS.push({"chatmessage":msg,"username":user.userName});
        if(Config.H2RAdress != ""){
          axios.post(Config.H2RAdress,{"messages": [{ "id": uid(5),
                    "snippet": {
                        "displayMessage": msg
                    },
                    "authorDetails": {
                        "displayName": user.userName,
                        "profileImageUrl": ""
                    },
                },
            ]
        })
        }
      })  
    
    user.on("question",(question)=>{
      console.log("new question",question)
      Questions.push({"question":question,"username":user.userName});
    })
  })
  }

function saveConfig(){
    fs.writeFileSync('settings.json', JSON.stringify(Config));
    
}
//Call to get all past Messages in a JSON format
app.get('/chat', function (req, res) {
    res.json(MSGS)
  })
  app.get('/allquestions', function (req, res) {
    res.json(Questions)
  })
  app.get('/as', function (req, res) {
    res.send(AS)
  })
start()