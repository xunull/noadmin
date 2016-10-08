var socket = require('socket.io-client')('http://localhost:22111/admin/monitor');
socket.on('connect', function() {
    console.log('socketio连接到服务端');
});
socket.on('event', function(data) {});
socket.on('disconnect', function() {
    console.log('socketio与服务端失去连接');
});

socket.on('status',function(data){
  console.log(data);
})

function getStatus() {
  socket.emit('status');
}

setInterval(getStatus,2000);
