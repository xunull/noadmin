var os = require('os');

exports.release = function() {
    return os.release();
}

exports.type = function() {
    return os.type();
}

exports.uptime = function() {
    return os.uptime();
}

exports.totalmem = function() {
    return os.totalmem();
}

exports.freemem = function() {
    return os.freemem();
}

exports.platform = function() {
    return os.platform();
}

/**
 * cpu的体系结构
 * @return {[type]} [description]
 */
exports.arch = function() {
    return os.arch();
}

exports.cpus = function() {
  return os.cpus();
}
