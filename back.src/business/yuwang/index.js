
// var Getsite = require('./getsite');
//
// // var targetSite = new Getsite('http://www.nodeapp.cn');
// var targetSite = new Getsite('http://www.bootcss.com');
// // 开始扒取网站
// targetSite.get();
const path = require('path');
const logger = thisapp.logger;
const appConfig = thisapp.config;
const thisContext = require('./context.json');
const thisDataFolder = path.join(appConfig.businessDataFolder,thisContext.businessName);

var TargetSite = require('./lib/TargetSite');

var targetSite = new TargetSite('http://www.bootcss.com');

const Business = require('core/business');

class YuwangBusiness extends Business {

}

module.exports = YuwangBusiness;

// targetSite.start();

/**
 * 对于business的index文件
 * 如果仅仅在业务加载的地方 require('index')
 * 那么业务的实际加载过程完全是由各个业务自己实现
 * 如果想要干预业务中的logger 比如说替换logger，为其赋予一个新的logger(带有相关业务category的logger)
 * 此替换操作可能并不会很完美，因为业务逻辑已经被加载过了
 *
 * 或者说require('index')时，使其不加载自身的业务逻辑
 * 比如说require('index')返回的是一个类，需要new 才可以使用
 * 那么就可以在new 创建的时候 侵入自己的某些预实现
 */
