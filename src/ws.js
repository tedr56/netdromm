'use strict'
var uuid = require('uuid');
var WebSocketServer = require('ws').Server;

function wsCtrl ( httpListener, logger, cb ) {
    this.logger = logger;
    this.wss = new WebSocketServer({ server: httpListener });
    var that = this;
    this.wss.broadcast = function(msg, sender) {
        that.wss.clients.forEach(function(client){
            if (client.id !== sender) client.send(msg) & logger.info('Message sent:' + msg + ' from ' + sender + ' to ' + client.id);
        });
    }
    this.wss.on('connection', function(socket){
      socket.id = uuid.v4();
      logger.info('user connected' + socket.upgradeReq.connection.remoteAddress);
      socket.on('disconnect', function(){
        logger.info('user disconnected' + socket.upgradeReq.connection.remoteAddress);
      });
      socket.on('message', function(msg){
        logger.info('Message received: ' + msg + ' from ' + socket.upgradeReq.connection.remoteAddress);
        that.wss.broadcast(msg, socket.id);
      });
    });
    return cb(null);
}

module.exports = wsCtrl;
