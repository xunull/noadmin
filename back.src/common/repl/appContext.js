/**
 * 使用宿主系统的context的repl
 * 是系统中集成的repl
 */
var stream = require('stream');
var repl = require('repl');
var Writable = stream.Writable;
var Readable = stream.Readable;
var EventEmitter = require('events');
var REPLEmitter = new EventEmitter();
var logger = require('../logger');

var replWrite = new Writable({
    write(chunk, encoding, callback) {
        REPLEmitter.emit('output', chunk.toString());
        callback();
    },
    writev(chunks, callback) {
        REPLEmitter.emit('output', chunk.toString());
        callback();
    }
});

replWrite.on('error', (error) => {
    logger.error('appContext REPL write has error');
    logger.error(error);
});

var replReadable = new Readable({read(size) {}});

replReadable.on('readable', function() {});

replReadable.on('error', (error) => {
    logger.error('appContext REPL read has error');
    logger.error(error);
});

function myWriter(output) {
    // console.log('myWriter= ', output);
    // console.log(replWrite._writableState.getBuffer());
    return output;
}

exports.start = function() {
    repl.start({writer: myWriter, useGlobal: true, input: replReadable, output: replWrite});
}

/**
 * repl的input
 * @param  {[type]} sentence [description]
 * @return {[type]}          [description]
 */
exports.input = function(sentence) {
    let tempBuffer = Buffer.from('' + sentence + '\n', 'utf8');
    replReadable.push(tempBuffer);
}

exports.REPLEmitter = REPLEmitter;
