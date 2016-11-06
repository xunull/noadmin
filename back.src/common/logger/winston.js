var winston = require('winston');
var colors = require('colors/safe');
var config = require('../../../config/app.config');

// var colors = {
//     error: 'red',
//     warn: 'red',
//     info: 'blue',
//     verbose: 'green',
//     debug: 'green',
//     silly: 'white'
// }

var logger = new(winston.Logger)({
    level: config.logger.level,
    // colors:colors, 对于内置的这些logger 颜色设置不起作用
    transports: [
        new(winston.transports.Console)({}),
        new(winston.transports.File)({name: 'log-file', filename: config.logger.logFile}),
        new(winston.transports.File)({name: 'error-file', filename: config.logger.errorFile, level: 'error'})
    ]
});

/**
 * logger 的颜色设置
 */
logger.filters.push(function(level, msg, meta) {
    switch (level) {
        case 'debug':
            return colors.blue(msg);
            break;
        case 'verbose':
            return colors.blue(msg);
            break;
        case 'info':
            return colors.green(msg);
            break;
        case 'warn':
            return colors.yellow(msg);
            break;
        case 'error':
            return colors.red(msg);
            break;
        default:
            return msg;
    }
});

module.exports = logger;
