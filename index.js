'use strict'

var nodemon = require('nodemon')
  , winston = require('winston')
  , http = require('http').createServer()
  , wss = require('./src/ws.js')
  , port = process.env.port || 8088;

function setUpLogger() {
    winston.configure({
        transports: [
            new (winston.transports.Console)({ colorize: true }),
            new (winston.transports.File)({ filename: 'netdromm.log' })
        ]
    });
    return Promise.resolve();
}

function initHttpServer() {
    return new Promise(function( resolve, reject ){
        http.listen(port, function(err) {
            if (err) return reject(err);
            winston.info('Application server running!');
            return resolve( http );
        });
    });
}

function initWsServer( httpListener ){
   return new wss(httpListener, winston);
}

function handleError( err ){
    winston.error(err);
}

setUpLogger()
.then(initHttpServer)
.then(initWsServer)
.catch(handleError);

