// socketio
var io = require('socket.io')(22111);

global.thisapp.socketio = io;

exports.io = io;
