var basic = require('./basic');

var find = require('./find');

/**
 * 对象合并，前提，各个模块不要有冲突
 */
Object.assign(basic, find);

module.exports = basic;
