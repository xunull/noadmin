var logger = require('./common/logger');
var config = require('./config');

var thisapp={
  logger:logger,
  config:config,
};

/**
 * 该对象持有app中一些配置的引用
 * @type {Object}
 */
global.thisapp=thisapp;

module.exports=global.thisapp;

/**
 * 防止出现意外没有想到的错误使整个程序崩溃
 * @param  {[type]} 'uncaughtException' [description]
 * @param  {[type]} function(err        [description]
 * @return {[type]}                     [description]
 */
process.on('uncaughtException',function(err){
  logger.error(err);
});

var mongoose = require('./common/mongoose');
var redis = require('./common/redis');
