/**
 * 本项目中的一些常用方法
 */
const url = require('url');
const superagent = require('superagent');
const logger = global.thisapp.logger;

/**
 * 验证url是否合法
 * 此合法不仅仅是可访问的意思
 * 也要使其能在此系统中可以使用的url
 * @param  {[type]} websiteUrl [description]
 * @return {[type]}            [description]
 */
exports.validateUrl = function(websiteUrl) {
    //
}

/**
 * 调用前要确保路径合法,调用valiateUrl方法
 * 从url路径中获取出网站的名字
 * 其实用hostname会更简单,更清晰
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
exports.getWebsiteName = function(websiteUrl) {
    if (!websiteUrl.startsWith('http')) {
        websiteUrl = 'http://' + websiteUrl;
    }
    let urlObject = url.parse(websiteUrl);
    let hostname = urlObject.hostname;
    let temp = hostname.split('.');
    if (temp.length === 3) {
        // 有二级域名或者www这种
        return temp[1];
    } else {
        // 没有二级域名
        return temp[0];
    }
}

exports.grabFile = function(resouceUrl) {

    return new Promise((resolve, reject) => {

        superagent.get(resouceUrl).end(function(err, res) {
            if (null !== err) {
                if (404 === err.status) {
                    logger.info('抓取' + resouceUrl + '路径出错,错误码是 is 404');
                } else {

                    logger.info('抓取' + resouceUrl + '路径出错,错误码是 is ' + err.status);
                    logger.error(err);
                }
                reject(err);
            } else {
                logger.info('抓取', resouceUrl, '路径成功');
                resolve(res);
            }
        });

    });
}
