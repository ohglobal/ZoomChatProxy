# ZoomChatProxy 

Brings Zoom Chat and Zoom Questions over to H2R Graphics or Vmix 

## Instalation 
1. install node.js
2. download this Repository 
3. navigate to the downloaded Repository in your Terminal/Comandline
4. run `npm install`
5. run `node index.js`

## Configs 
### HttpPort:
defaults to 8080
used to set the Port used on the Webserver for integration into VMIX 

### ZoomPort:
defaults to 8081
used to set the Port used of where ZoomOSC sends it's OSC to

### H2RAdress :
defaults to http://localhost:4001/api/ABCD/"
used to set the API address of H2R Graphics used for sending Chat and Questions into H2R Graphics List 

## Todos 
- [x] Inital Version
- [ ] create Package
- [ ] Document ZoomOSC Settings 
- [ ] Document H2R Graphics Settings 
- [ ] Create Vmix Example Preset 

## Tools used 
[ZoomOSC](https://www.liminalet.com/zoomosc)

[H2R Graphics](https://h2r.graphics)

[Vmix](https://www.vmix.com)
