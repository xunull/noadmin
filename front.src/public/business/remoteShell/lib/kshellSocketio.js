var socket = require('socket.io-client')('http://localhost:22133/admin/kshell');
var EventEmitter = require('events');
var kshellEmitter = new EventEmitter();


kshellEmitter.on('input', function(value) {
    socket.emit('input', value);
})

socket.on('connect', function() {
    console.log('kshell 建立连接');

    console.log(socket);
    /**
     * socket id 认证时使用
     * @type {[type]}
     */
    kshellEmitter.socketid = socket.id;
});
socket.on('disconnect', function() {
    console.log('kshell 与服务端失去连接');
});

socket.on('output', function(data) {
    kshellEmitter.emit('output', data);
});

function getStatus() {
    socket.emit('status');
}

exports.kshellEmitter = kshellEmitter;
exports.socket = socket;
