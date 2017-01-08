'use strict';

var Promise = global.Promise || require('promise');
var nodemon = require('nodemon');
var winston = require('winston');
var http = require('http');
var server = http.createServer();
var wss = require('./src/ws.js');
var  port = process.env.port || 8088;

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
        server.listen(port, function(err) {
            if (err) return reject(err);
            winston.info('Application server running on port '+ port +'!');
            return resolve( server );
        });
    });
}

function initWsServer( httpListener ){
   return wss(httpListener, winston);
}

function listenProcessSignals(httpListener) {
    return Promise
           .resolve()
           .then(function(){
               process.on('SIGTERM', function () {
                   process.exit(0);
               });
               process.on('uncaughtexception', function (err) {
                  console.log(err);
                  process.exit(0);
               });
               process.on('SIGINT', function () {
                  process.exit(0);
               });
           });
}

function handleError( err ){
    winston.error(err);
}

setUpLogger()
.then(initHttpServer)
.then(initWsServer)
.then(listenProcessSignals)
.catch(handleError);

