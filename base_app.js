var common = require('./back.src/node_modules/common');
var logger = require('./back.src/node_modules/common/logger').logger;
var config = require('./config/app.config');
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');

var appConfigYaml = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './properties/app_config.yaml')));

var thisapp = {
    common: common,
    logger: logger,
    config: config,
    appConfigYaml: appConfigYaml
};

/**
 * thisapp 对象加固
 */
common.define.reinforceObject(thisapp);

/**
 * 该对象持有app中一些配置的引用
 *
 * @type {Object}
 */
global.thisapp = thisapp;

/**
 * global thisapp 加固
 */
common.define.reinforceObjectOneObject(global,'thisapp');

module.exports = global.thisapp;

/**
 * 防止出现意外没有想到的错误使整个程序崩溃
 * @param  {[type]} 'uncaughtException' [description]
 * @param  {[type]} function(err        [description]
 * @return {[type]}                     [description]
 */
process.on('uncaughtException', function(err) {
    console.log(err);
// logger.error(err);
});

var mongoose = require('./back.src/node_modules/common/mongoose');
var redis = require('./back.src/node_modules/common/redis');
