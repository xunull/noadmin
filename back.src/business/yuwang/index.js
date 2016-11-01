
// var Getsite = require('./getsite');
//
// // var targetSite = new Getsite('http://www.nodeapp.cn');
// var targetSite = new Getsite('http://www.bootcss.com');
// // 开始扒取网站
// targetSite.get();


var TargetSite = require('./lib/TargetSite');

var targetSite = new TargetSite('http://www.bootcss.com');

targetSite.start();
