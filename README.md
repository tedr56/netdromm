# netdromm
Multi-channel websocket server.
Websockets server for OSC, MIDI, chat, video channels, shaders, webp streaming etc. made with nodejs

Setup nodejs 7
`wget http://nodejs.org/dist/node-latest.tar.gz
tar -xzf node-latest.tar.gz
cd [node folder]
./configure
make
sudo make install`

Git workflow:
Fork and clone this repo in /opt/netdromm/
`npm install -g mocha nodemon<br />
npm install
npm start
copy netdromm to /etc/init.d/ to launch at startup`

Run tests with `npm test`

Code, than commit and push to your fork then do a pull request.
