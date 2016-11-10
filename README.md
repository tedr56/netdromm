# netdromm
Multi-channel websocket server.
Websockets server for OSC, MIDI, chat, video channels, shaders, webp streaming etc. made with nodejs

######Setup nodejs 7
- wget http://nodejs.org/dist/node-latest.tar.gz 
- tar -xzf node-latest.tar.gz
- cd node-7xx
- ./configure
- make
- sudo make install

On Raspberry Pi, it takes 4 hours :notes:

######Git workflow:
Fork and clone this repo in /opt/
- cd netdromm/
- npm install -g mocha nodemon
- npm install
- npm start
copy netdromm to /etc/init.d/ to launch at startup

######Run tests
`npm test`

######Contribute
Code, than commit and push to your fork then do a pull request.

######Roadmap
- [x] Basic websocket broadcast
- [ ] Authentication
- [ ] Webp streaming
