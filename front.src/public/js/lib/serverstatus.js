var socket = require('socket.io-client')('http://localhost:22111/admin/monitor');
var EventEmitter = require('events');
var statusEmitter = new EventEmitter();

socket.on('connect', function() {
    console.log('socketio连接到服务端');
});
socket.on('event', function(data) {});
socket.on('disconnect', function() {
    console.log('socketio与服务端失去连接');
});

socket.on('status', function(data) {

    statusEmitter.emit('status', data);

});

function getStatus() {
    socket.emit('status');
}

setInterval(getStatus, 2000);

exports.statusEmitter = statusEmitter;

exports.initStatus = function() {
    socket.emit('initStatus');
    // 这个接收到的是数组
    socket.on('initStatus',function(data){
        statusEmitter.emit('initStatus', data);
    });
}
