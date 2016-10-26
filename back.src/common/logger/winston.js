var winston = require('winston');
var config = require('../../../config/app.config');

var logger = new(winston.Logger)({
    level: config.logger.level,
    transports: [
        new(winston.transports.Console)({
        }),
        new(winston.transports.File)({name: 'log-file', filename: config.logger.logFile}),
        new(winston.transports.File)({name: 'error-file', filename: config.logger.errorFile, level: 'error'})
    ]
});

module.exports = logger;
