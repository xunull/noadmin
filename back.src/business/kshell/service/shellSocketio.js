var io = require('socket.io')(22133);
var replSocketio = io.of('/admin/kshell');

var logger = global.thisapp.logger;

var EventEmitter = require('events');
var replEmitter = new EventEmitter();

module.exports = replEmitter;

replSocketio.on('connection', function(socket) {

    console.log('a client connected, socket id is ' + socket.id);
    
    replEmitter.on('output', (data) => {
        socket.emit('output', data);
    });

    socket.on('input', function(inputValue) {

        logger.info(inputValue);
        replEmitter.emit('input', inputValue);

    });

    socket.on('error', function(err) {
        console.log('socket id is ' + socket.id + ' has error');
        console.log(err);
    });

    socket.on('disconnect', function() {
        console.log('a client disconnect, socket id is ' + socket.id);
    });

});
