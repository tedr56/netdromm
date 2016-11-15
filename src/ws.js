'use strict'
var uuid = require('uuid');
var WebSocketServer = require('ws').Server;

function wsCtrl ( httpListener, logger ) {
    this.logger = logger;
    this.wss = new WebSocketServer({ server: httpListener });
    // var that = this;
    return Promise.resolve(this);
}

function addBroadcastPolyfill( instance ) {
    return Promise.resolve()
    .then(function(){
        instance.wss.broadcast = function(msg, sender) {
            instance.wss.clients.forEach(function(client){
                if (client.id !== sender) client.send(msg) & instance.logger.info('Message sent:' + msg + ' from ' + sender + ' to ' + client.id);
            });
        }
        return instance;
    })
}

function addWsEvtListeners( instance ) {
    return Promise.resolve()
    .then(function(){
         instance.wss.on('connection', function(socket){
          socket.id = uuid.v4();
          // to try if behind a proxy: logger.info('user connected' + socket.upgradeReq.headers['x-forwarded-for']);
          instance.logger.info('user connected: ' + socket.upgradeReq.connection.remoteAddress);
          socket.on('disconnect', function(){
            instance.logger.info('user disconnected: ' + socket.upgradeReq.connection.remoteAddress);
          });
          socket.on('message', function(msg){
            instance.logger.info('Message received: ' + msg + ' from ' + socket.upgradeReq.connection.remoteAddress);
            instance.wss.broadcast(msg, socket.id);
          });
        });
        return instance;
    });
}

module.exports = function( httpListener, logger ) {
    return new wsCtrl( httpListener, logger )
    .then(addBroadcastPolyfill)
    .then(addWsEvtListeners);
}
