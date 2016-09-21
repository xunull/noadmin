/**
 * nodejs 的运行时间，单位是秒
 * @return {[type]} [description]
 */
exports.uptime = function() {
  return process.uptime();
}

exports.version = function() {
  return process.version;
}

exports.cwd = function() {
  return process.cwd();
}

/**
 * 根据任意取的一个过去的时间点，距离现在的时间来获取一个精确的时间戳对象：[秒, 纳秒]
 * @return {[type]} [description]
 */
exports.hrtime = function() {
  return process.hrtime();
}

exports.cpuUsage = function() {
  return process.cpuUsage();
}

exports.versions = function() {
  return process.versions;
}
