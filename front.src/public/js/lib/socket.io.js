var socket = require('socket.io-client')('http://localhost:22111');
socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});
