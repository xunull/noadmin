const os = require('os');
exports.homedir = os.homedir();

exports.hostname = os.hostname();

/**
 * cpu的体系解构
 * @type {[type]}
 */
exports.arch=os.arch();

/**
 * linux,mac,window
 * @type {[type]}
 */
exports.osType = os.type();

exports.uptime = os.uptime();

exports.platform = os.platform();
