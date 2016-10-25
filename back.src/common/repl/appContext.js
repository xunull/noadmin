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
    objectMode: true,
    decodeStrings: false,
    write(chunk, encoding, callback) {

        // console.log(chunk.toString());
        // REPLEmitter.emit('output', chunk.toString());

        REPLEmitter.emit('output', chunk);
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
    // console.log('myWriter ', output);
    // TODO
    // write(chunk, encoding, callback)
    // 这个方法,比如调用thisapp.config 的时候
    // chunk的值 会是[object Object] 目前没有找到原因
    // objectMode: true,
    // decodeStrings: false, 这两个参数并不能解决掉这个问题
    // 因此在写入之前 先将对象序列化
    return JSON.stringify(output,null,4);
}

exports.start = function() {
    repl.start({writer: myWriter, useGlobal: true, input: replReadable, output: replWrite});

    // repl.start({useGlobal: true});
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
