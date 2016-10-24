/**
 * 使用外部系统的context的repl
 * 是系统中集成的repl
 */
var stream = require('stream');
var repl = require('repl');
var Writable = stream.Writable;
var Readable = stream.Readable;

var replWrite = new Writable({
    write(chunk, encoding, callback) {
        console.log('replWrite._writev');
        console.log('out= ' + chunk.toString());
        callback();
    },
    writev(chunks, callback) {
        console.log('replWrite._writev');
        console.log('out= ' + chunk.toString());
        callback();
    }
});

replWrite.on('error', (error) => {
    console.log(error);
});

// var replReadable = new Readable({
//     // read(size) {
//     //     console.log(size);
//     //     console.log('11111111111');
//     //     return Buffer.from('11111\n', 'utf8');
//     // }
// });

var replReadable = new Readable();

replReadable._read = function() {
    console.log('11111111111');
    console.log(replReadable._readableState.buffer);
    // return Buffer.from('11111\n', 'utf8');
}

replReadable.on('readable', function() {
    // there is some data to read now
    console.log('there is some data to read now');
});

replReadable.on('error', (error) => {
    console.log(error);
});

// replReadable.on('data', (data) => {
//     console.log('data is ', data.toString());
// });

function myWriter(output) {
    console.log('myWriter= ', output);
    // console.log(replWrite._writableState.getBuffer());
    return output;
}

exports.start = function() {
    repl.start({
        prompt: '^-^ ', writer: myWriter,
        // terminal: false,
        useGlobal: true,
        input: replReadable,
        output: replWrite
    });
    var tempBuffer = Buffer.from('var a=1234;console.log(a)\n', 'utf8');
    replReadable.push(tempBuffer);
    // replReadable.push('var a=1\n');
    // replReadable.push(null);
    // replReadable.resume();
}

// setInterval(input, 5000);

var aaaa = 1;

function input() {
    aaaa++;
    let tempBuffer = Buffer.from('' + aaaa + '\n', 'utf8');
    replReadable.push(tempBuffer);
    // replReadable.push('var a=1\n');
    // replReadable.push(null);
    // replReadable.resume();
}
