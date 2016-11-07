var winston = require('winston');
var path = require('path');
var colors = require('colors/safe');
var config = require('../../../config/app.config');

// 系统默认所有log文件存储的位置
const defaultLogFileDir = config.logFileDir;

// var colors = {
//     error: 'red',
//     warn: 'red',
//     info: 'blue',
//     verbose: 'green',
//     debug: 'green',
//     silly: 'white'
// }

/**
 * 默认实现的logger
 * @type {[type]}
 */
var defaultLogger = new(winston.Logger)({
    level: config.logger.level,
    // colors:colors, 对于内置的这些logger 颜色设置不起作用
    transports: [
        new(winston.transports.Console)({}),
        new(winston.transports.File)({
            name: 'log-file',
            filename: path.resolve(defaultLogFileDir, config.logger.logFileName)
        }),
        new(winston.transports.File)({
            name: 'error-file',
            level: 'error',
            filename: path.resolve(defaultLogFileDir, config.logger.errorFileName)
        })
    ]
});

/**
 * debug blue
 * info warn error 红绿灯的颜色
 * logger 的颜色设置
 */
defaultLogger.filters.push(function(level, msg, meta) {
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

module.exports = {
    defaultLogger: defaultLogger,
    // 用户自定义logger时使用
    winstonLogger: winston.Logger
};
