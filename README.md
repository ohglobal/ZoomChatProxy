# ZoomChatProxy 

Brings Zoom Chat and Zoom Questions over to H2R Graphics or Vmix 

## Instalation 
1. install node.js
2. download this Repository 
3. navigate to the downloaded Repository in your Terminal/Comandline
4. run `npm install`
5. run `node index.js`

## Settings 
to configure this app you need to edit the `settings.json` file placed in the same folder as the `index.js`.file.
### HttpPort:
defaults to 8080
used to set the Port used on the Webserver for integration into VMIX 

### ZoomPort:
defaults to 8081
used to set the Port used of where ZoomOSC sends it's OSC to
### ZoomIP:
defaults to 127.0.0.1 
used to set the IP of where ZoomOSC lives on
### H2RAdress :
used to set the HTTPlistsner Adress of H2R Graphics, first create a Http listner Data source first in H2R Graphics and then copy the Adress from the Data source into this field.
## ZoomOSC Settings
TransmissonPort should be set to 1234


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

[Zoomoscjs](https://www.npmjs.com/package/@bytehive/zoomoscjs)
