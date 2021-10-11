const ZOSC = require("./ZOSC")
const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);

//creation of a new ZoomOSC conection
var zoscCon = new ZOSC("3333")
//Global Variable to store the chat messages in
var MSGS =[];

zoscCon.on("chat",(msg)=>{
    MSGS.push({"user":msg[2],"content":msg[5]})
    console.log(MSGS)
})
//Call to get all past Messages in a JSON format
app.get('/', function (req, res) {
    res.json(MSGS)
  })
//Start the Webserver
server.listen(9000)