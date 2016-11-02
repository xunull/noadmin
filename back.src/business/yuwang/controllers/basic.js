const fork = require('child_process').fork;
const path = require('path');

const logger = thisapp.logger;
const fishpond = require('../service/fishpond');

exports.start = function(req, res, next) {
    fishpond.push(req.body);

    let websiteUrl = req.body.websiteUrl;
    let savePath = req.body.savePath;
    let urlPattern = req.body.urlPattern;
    let all = req.body.all;
    let checkList = req.body.checkList;
    logger.info(websiteUrl);
    logger.info(savePath);
    logger.info(urlPattern);
    logger.info(all);
    logger.info(checkList);
    res.reply('haha');
}
