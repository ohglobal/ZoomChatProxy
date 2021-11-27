const EventEmitter = require('events');
const {Server,Client} = require( 'node-osc')

var OSCServer = null;
module.exports = class ZoomOSC extends EventEmitter{
    
    constructor(port){
        super()
        //this.emit("hello","world")
    OSCServer = new Server(port, '127.0.0.1', () => {
        console.log('OSC Server is listening');
        
      });
      OSCServer.on('error', function (error){
          console.log("error",error)
      })
      OSCServer.on('message', (msg)=> {
        console.log("newcmd",msg);
        let address = msg[0];
        var splitAddress = address.split("/zoomosc/")[1].trim();
        
        switch(splitAddress){
            case "user/activeSpeaker":
            this.emit("activeSpeaker",msg)
            break;
            case "user/videoOn":
            this.emit("videoOn",msg)
            break;
            case "user/videoOff":
            this.emit("videoOff",msg)
            break;
            case "user/online":
            this.emit("online",msg)
            break;
            case "user/offline":
            this.emit("offline",msg)
            break;
            case "user/muted":
            this.emit("muted",msg)
            break;
            case "user/unmuted":
            this.emit("unmuted",msg)
            break;
            case "":
            this.emit("videoOff",msg)
            break;
            case "user/list":
                this.emit("list",msg)
            break;
            case "user/userNameChanged":
                this.emit("userNameChanged",msg)
            break;
            case "user/chat":
            this.emit("chat",msg)
            break;
            case "user/askedQuestion":
            this.emit("question",msg)
            break;
        }
        
      });
    }


}