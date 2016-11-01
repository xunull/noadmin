/**
 * 使用log4js 的logger 实现
 * @type {[type]}
 */
var config = require('../../../config/app.config');

var env = process.env.NODE_ENV || "development";

var log4js = require('log4js');
log4js.configure({
  appenders: [{
    type: 'console'
  }, {
    type: 'file',
    filename: config.logger.logFile,
    category: 'noadmin'
  }],
  // 不替换node 自己的console
  // replaceConsole: true
});

// category 应该是logger的名字的意思
var logger = log4js.getLogger('noadmin');
logger.setLevel(config.debug && env !== 'test' ? 'DEBUG' : 'ERROR');

/**
 * 此方法调试的时候使用
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
logger.focus=function(obj) {
    logger.info('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+');
    logger.info(obj);
    logger.info('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+');
}

module.exports = logger;
