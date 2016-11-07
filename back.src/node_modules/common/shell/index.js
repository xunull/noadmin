const exec = require('./exec');

const execFile = require('./execFile');

var target = {};

Object.assign(target, exec, execFile);

module.exports = target;
