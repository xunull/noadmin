var socket = require('socket.io-client')('http://localhost:22122/admin/repl');
var EventEmitter = require('events');
var replEmitter = new EventEmitter();

replEmitter.on('input', function(value) {
    socket.emit('input', value);
})

socket.on('connect', function() {
    console.log('repl client 连接到服务端');
});
socket.on('disconnect', function() {
    console.log('repl client 与服务端失去连接');
});

socket.on('output', function(data) {
    replEmitter.emit('output', data);
});

function getStatus() {
    socket.emit('status');
}

module.exports = replEmitter;
