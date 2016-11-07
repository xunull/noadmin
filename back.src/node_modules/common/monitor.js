var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var os = require('./os');
var logger = require('./logger');

/**
 * 调用的最小间隔是500ms
 * @type {Number}
 */
var minInterval = 500;
var lastTime = 0;
var lastUsage = [];

/**
 * TODO 算出来的值好像是不正确的
 * 返回值为数组，第一个值为用户的使用比例，第二个为系统的使用比例，第三个为闲置的比例
 * @return {[type]} [description]
 */
exports.cpuUsage = function() {
    if (!Date.now() - lastTime > minInterval) {
        return lastUsage;
    }
    lastTime = Date.now();
    let cpus = os.cpus();

    let totalUserTime = 0;
    let totalSysTime = 0;
    let totalIdleTime = 0;
    for (let cpu of cpus) {
        let times = cpu.times;
        totalUserTime += times.user;
        totalSysTime += times.sys;
        totalIdleTime += times.idle;
    }
    let total = totalUserTime + totalSysTime + totalIdleTime;

    totalUserTime = 100 * totalUserTime / total;
    totalSysTime = 100 * totalSysTime / total;
    totalIdleTime = 100 * totalIdleTime / total;

    return {'user': totalUserTime.toFixed(2), 'sys': totalSysTime.toFixed(2), 'idle': totalIdleTime.toFixed(2)}
}

/**
 * 内存使用率
 * @return {[type]} [description]
 */
exports.memoryUsage = function() {
    let temp = 100 * os.freemem() / os.totalmem();
    return 100 - temp.toFixed(2);
}
