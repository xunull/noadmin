var monitor = require('../common/monitor');
var logger = global.thisapp.logger;
var socketio = require('../socket.io');
var logger = global.thisapp.logger;
var io = socketio.io;

var adminMonitor = io.of('/admin/monitor');

var status = [];

function getStatus() {
    if (status.length >= 3600) {
        // 保证保留两个小时的记录
        status.shift();
    }
    status.push({'cpu': monitor.cpuUsage(), 'memory': monitor.memoryUsage()});
}

setInterval(getStatus, 2000);

adminMonitor.on('connection', function(socket) {
    console.log('someone connected to adminMonitor');

    // 传送初始化数据
    socket.on('initStatus', function(letter) {
        socket.emit('initStatus', status);
    });

    socket.on('status', function(letter) {

        let new_status = {
            'cpu': monitor.cpuUsage(),
            'memory': monitor.memoryUsage()
        }
        // 传的如果是对象，对面接受的也是对象
        socket.emit('status', new_status);
    });

    socket.on('error', function(err) {
        console.log('socket id is ' + socket.id + ' has error');
        console.log(err);
    });

    socket.on('disconnect', function() {
        console.log('a client disconnect, socket id is ' + socket.id);
    });
});
