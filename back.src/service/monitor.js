var monitor = require('../common/monitor');

var socketio = require('../socket.io');
var logger = global.thisapp.logger;
var io = socketio.io;

var adminMonitor = io.of('/admin/monitor');
adminMonitor.on('connection', function(socket) {
    console.log('someone connected to adminMonitor');
    socket.on('status', function(letter) {

        let status = {
          'cpu':monitor.cpuUsage(),
          'memory': monitor.memoryUsage()
        }
        // 传的如果是对象，对面接受的也是对象
        socket.emit('status', status);
    });

    socket.on('error', function(err) {
        console.log('socket id is ' + socket.id + ' has error');
        console.log(err);
    });

    socket.on('disconnect', function() {
        console.log('a client disconnect, socket id is ' + socket.id);
    });
});
