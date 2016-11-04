const fork = require('child_process').fork;
const path = require('path');

const logger = thisapp.logger;
const fishpond = require('../service/fishpond');
const TargetSite = require('../lib/TargetSite');

exports.start = function(req, res, next) {

    let websiteUrl = req.body.websiteUrl;
    let savePath = req.body.savePath;
    let urlPattern = req.body.urlPattern;
    let all = req.body.all;
    let checkList = req.body.checkList;
    let isSingle = req.body.isSingle;
    let grabImg = req.body.grabImg;
    try {
        var targetSite = new TargetSite(websiteUrl,savePath,urlPattern,all,checkList,isSingle,grabImg);
        targetSite.start();
        res.reply('haha');
    } catch(err) {
        logger.error(err);
    }

}
