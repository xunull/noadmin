var common = require('./back.src/common');
var logger = require('./back.src/common/logger');
var config = require('./config/app.config');
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');

var appConfigYaml = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './properties/app_config.yaml')));

var thisapp = {
    common:common,
    logger: logger,
    config: config,
    appConfigYaml: appConfigYaml
};

/**
 * 该对象持有app中一些配置的引用
 * @type {Object}
 */
global.thisapp = thisapp;

module.exports = global.thisapp;

/**
 * 防止出现意外没有想到的错误使整个程序崩溃
 * @param  {[type]} 'uncaughtException' [description]
 * @param  {[type]} function(err        [description]
 * @return {[type]}                     [description]
 */
process.on('uncaughtException', function(err) {
    logger.error(err);
});

var mongoose = require('./back.src/common/mongoose');
var redis = require('./back.src/common/redis');
