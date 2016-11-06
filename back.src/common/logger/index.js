var colors = require('colors/safe');

var winstonLogger = require('./winston');

var log4jsLogger = require('./log4js');

const logger = winstonLogger;

module.exports = winstonLogger;
