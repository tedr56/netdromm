# netdromm
Multi-channel websocket server.
Websockets server for OSC, MIDI, chat, video channels, shaders, webp streaming etc. made with nodejs

######Setup nodejs 7

On Linux

``` sh
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
```

If needed, compile from the source:

``` sh
wget http://nodejs.org/dist/node-latest.tar.gz 
tar -xzf node-latest.tar.gz
cd node-7xx
./configure
make
sudo make install
```

On Raspberry Pi, it takes 4 hours :notes:

######Git workflow:
Fork and clone this your repo and copy it to /opt/

``` sh
git clone https://github.com/videodromm/netdromm (replace videodromm by your name)
cp -a netdromm/ /opt/
cd /opt/netdromm/
npm install -g mocha nodemon
npm install
npm start
```

Optional
copy netdromm to /etc/init.d/ to launch at startup

``` sh
cp /opt/netdromm/netdromm /etc/init.d/
update-rc.d netdromm defaults
```

######Run tests
`npm test`

######Docker
``` sh
docker build -t netdromm .
docker run -it --rm --name netdromm netdromm
```

######Contribute
Code, than commit and push to your fork then do a pull request.

######Roadmap
- [x] Basic websocket broadcast
- [ ] Authentication
- [ ] Maintain a list of clients (ip whitelist after auth)
- [ ] Webp streaming
