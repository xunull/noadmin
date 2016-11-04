var path = require('path');
const logger = global.thisapp.logger;
const yuwangUtil = require('./util');
const Resource = require('./Resource');
var executeQueue = require('./executeQueue');
const Regular = require('./Regular');

/**
 * 拉取纯静态的网站是比较好的,vue,react,angular这种前端渲染的网站现在没法做到
 */
class GetSite {
    constructor(siteUrl, savePath, urlPattern, all, checkList,isSingle,grabImg) {
        this.savePath = savePath;
        this.urlPattern = urlPattern;
        this.all = all;
        this.checkList = checkList;
        this.siteUrl = siteUrl;
        this.isSingle = isSingle;
        this.grabImg = grabImg;
        
        if (all) {
            this.regular = new Regular(urlPattern,null,true,isSingle,grabImg);
        } else {
            this.regular = new Regular(urlPattern,checkList,false,isSingle,grabImg);
        }

        // 保存目录的名字
        this.rootDir = yuwangUtil.getWebsiteName(siteUrl);
        this.isDone = false;
        this.type = null;
        // 记录了该网站中的所有页面资源路径
        // 这两个记录的只是路径
        this.pagePaths = [];
        this.assetPaths = [];

        // 有的链接 比如首页 就是自己网站的地址
        // 因为第一个资源是以/开始的,所以要把这个先记录
        this.pagePaths.push(siteUrl);

        this.allPaths = [];
        this.allPaths.push(siteUrl);
    }
    start() {
        let indexResource = new Resource('/', null, this, true,'a',this.regular);
        indexResource.grab();
    }
    /**
     * 判断path 是否已经被拔取过
     */
    existPath(path) {

        for (let temp of this.allPaths) {
            if (temp === path) {
                return true;
            }
        }

        // for (let temp of this.pagePaths) {
        //     if (temp === path) {
        //         return true;
        //     }
        // }
        //
        // for (let temp of this.assetPaths) {
        //     if (temp === path) {
        //         return true;
        //     }
        // }
        // 每一个都没有匹配上之后,返回false
        return false;
    }
    pushPagePath(path) {
        this.pagePaths.push(path);
    }
    pushAssetPath(path) {
        this.assetPaths.push(path);
    }
    recordPath(path) {
        this.allPaths.push(path);
    }
    isDone() {
        return this.isDone;
    }
}

module.exports = GetSite;
