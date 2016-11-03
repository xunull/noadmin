const fork = require('child_process').fork;
const path = require('path');

const logger = thisapp.logger;
const fishpond = require('../service/fishpond');
const TargetSite = require('../lib/TargetSite');

exports.start = function(req, res, next) {

    logger.info(req.body);

    let websiteUrl = req.body.websiteUrl;
    let savePath = req.body.savePath;
    let urlPattern = req.body.urlPattern;
    let all = req.body.all;
    let checkList = req.body.checkList;
    let isSingle = req.body.isSingle;

    var targetSite = new TargetSite(websiteUrl,savePath,urlPattern,all,checkList,isSingle);
    targetSite.start();

    logger.info(websiteUrl);
    logger.info(savePath);
    logger.info(urlPattern);
    logger.info(all);
    logger.info(checkList);
    res.reply('haha');
}
