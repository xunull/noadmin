/**
 * 使用外部系统的context的repl
 * 是系统中集成的repl
 */
const stream = require('stream');
const repl = require('repl');

exports.start = function() {
    repl.start({prompt: '^-^', useGlobal: true});
}
