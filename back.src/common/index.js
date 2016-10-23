// import 语句能加载index.js么 (现在node 也不支持import)

/**
 * 这些定义都是可以被修改的，
 * 要想不被修改 需要使用Object.defineProperty(xxx,xx,{xxx})
 * @type {[type]}
 */
exports.file = require('./file');

// exports.logger = require('./logger');

exports.yaml = require('./utils/yaml');

exports.nodeOs = require('./utils/node-os');

exports.repl = require('./repl');
