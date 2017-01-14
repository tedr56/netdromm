var mocha = require('mocha');
var chai = require('chai');
var chaiPromised = require('chai-as-promised');
var wss = require('../../src/ws.js');
var WebSocket = require('ws');
var Promise = global.Promise || require('promise');

chai.use(chaiPromised);
var expect = chai.expect;

describe('Websocket initialization', function(){
    this.timeout(10 * 1000);
    var testMsg = 'A test message';
    before(function(done) {
        var http = require('http').Server();
        var winston = require('winston');
        http.listen(8088, function() {
            console.log('HTTP server initialized!');
        });
        var logger = {info:function(){}};
        new wss(http, winston)
        .then(function(){
            winston.info('Server initialized');
            done();
        });
    });

    it('Accept incoming connections', function(done){
        var ws = new WebSocket('ws://localhost:8088');
        ws.on('open', function(){
            ws.close();
            done();
        });
    });

    it('Send messages', function(done){
        var ws = new WebSocket('ws://localhost:8088');
        ws.on('open', function(){
           ws.send(testMsg);
           ws.close();
           done();
        });
    });

    it('Broadcast messages', function(done){
        var ws = new WebSocket('ws://localhost:8088');
        ws.on('message', function(msg){
            expect(msg).to.be.equal(testMsg);
            ws.close();
            ws2.close();
            done();
        });
        var ws2 = new WebSocket('ws://localhost:8088');
        ws2.on('open', function(){
           ws2.send(testMsg);
        });
    });

    it('Return error if client send invalid command', function(done){
        var ws = new WebSocket('ws://localhost:8088');
        ws.on('open', function(){
           ws.send(JSON.stringify({cmd: 'invalid_command'}));
        });
        ws.on('message', function(msg){
            var unwrappedMsg = JSON.parse(msg);
            expect(unwrappedMsg).to.include.keys('error');
            expect(unwrappedMsg['error']).to.equals('invalid command');
            ws.close();
            done();
        });
    });

    it('Connect to default channel', function(done){
        var ws = new WebSocket('ws://localhost:8088');
        ws.on('open', function(){
           ws.send(JSON.stringify({cmd: 'getChannel'}));
        });
        ws.on('message', function(msg){
            var unwrappedMsg = JSON.parse(msg);
            expect(unwrappedMsg).to.include.keys('joinedChannels');
            expect(unwrappedMsg['joinedChannels']).to.be.an('array');
            expect(unwrappedMsg['joinedChannels'][0]).to.equals('default');
            ws.close();
            done();
        });
    });

    it('Broadcast to default channel', function(done){
        var ws = new WebSocket('ws://localhost:8088');
        var ws2 = new WebSocket('ws://localhost:8088');
        ws.on('open', function(){
           ws.send('Hello users!');
        });
        ws2.on('message', function(msg){
            expect(msg).to.equals('Hello users!');
            done();
        });
    });

});
