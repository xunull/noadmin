
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

// targetSite.start();
