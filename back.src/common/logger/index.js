// winston的实现比log4js更全面
var winstonLogger = require('./winston');

// var log4jsLogger = require('./log4js');

const logger = winstonLogger.defaultLogger;

module.exports = {
    logger: logger,
    winstonLogger: winstonLogger.winstonLogger
}
