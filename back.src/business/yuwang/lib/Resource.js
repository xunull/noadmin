/**
 * resouce代表了任意一种资源
 * path 是在网站中的path
 */
const superagent = require('superagent');
const cheerio = require('cheerio');
var executeQueue = require('./executeQueue');
var fileUtils = require('./fileUtils');
const yuwangUtil = require('./util');
const url = require('url');
const logger = global.thisapp.logger;
const _path = require('path');

class Resource {

    /**
     * path 此资源的地址
     * belongPath path 出现在的页面的地址
     * targetSite 要拉取的目标网站的地址
     * isPage 此资源是否是页面的标志
     * (此资源如果是页面可以继续分析页面上是否有其他资源,
     * 如果是一些css文件等，就不需要继续分析了,目前以这种方式实现)
     */
    constructor(path, belongPath, targetSite, isPage = false, type = 'html') {
        this.path = path;
        // basePath是该资源所在的页面,比如说js链接所在的html页面的路径
        this.belongPath = belongPath;
        // 该资源是否是一个页面
        this.isPage = isPage;
        this.targetSite = targetSite;
        this.isdone = false;
        this.type = type;
    }

    grab() {
        executeQueue.push(this);
    }

    extractPageResource($, belongPath) {
        /**
         * 链接有目标地址http 开头的,如http://(https://)
         * 或者是绝对路径开头的,如 ／xxx  (但是这种 有种情况是，目标扒取的网站有可能是有项目名的);
         * 或者是相对路径开头的 如 ../xxx ,./xxx
         * 或者是 # 标签
         */
        let pageResource = [];
        let that = this;
        $('a').each(function(i, elem) {
            var href = $(this).attr('href');
            if (undefined !== href) {
                let resource = new Resource(href, belongPath, that.targetSite, true, 'html');
                pageResource.push(resource);
            }
        });
        return pageResource;
    }

    extractAssetsResource($, belongPath) {
        /**
         * 分析出各种资源文件
         * 目前认为资源文件是不会有嵌套的
         * 不过像是css文件这种还是可能会引入其他css文件的
         *
         */
        let assetsResource = [];

        // 为了在cheerio 的each 方法中可以使用this
        let that = this;

        $('link').each(function(index, elem) {
            // cheerio 的each 方法的 this 指代的是当前的element
            var href = $(this).attr('href');
            if (undefined !== href) {
                let resource = new Resource(href, belongPath, that.targetSite, false, 'css');
                assetsResource.push(resource);
            }
        });

        $('script').each(function(i, elem) {
            var src = $(this).attr('src');
            if (undefined !== src) {
                let resource = new Resource(src, belongPath, that.targetSite, false, 'script');
                assetsResource.push(resource);
            }
        });

        $('img').each(function(i, elem) {
            var src = $(this).attr('src');
            if (undefined !== src) {
                let resource = new Resource(src, belongPath, that.targetSite, false, 'img');
                assetsResource.push(resource);
            }
        });
        return assetsResource;
    }

    analysePath(resource) {
        // 分析path 是否可以拉取

        let path = resource.path;
        // 目前http开头的文件都不会拉取，因为没有改写页面中的链接地址，
        // 即使拉取了，访问的时候也会跳到原来的网站
        //
        // 以完整http开头的地址，大部分都是其它网站的资源
        // 当然在自己的网站中也有可能会这么写
        if (path.startsWith('http')) {
            // if (path.startsWith(this.targetSite.siteUrl)) {
            //     // 还是属于目标网址下
            //     return true;
            // }
            return false;
        }

        if (path.startsWith("/")) {
            // 绝对路径
            // if (this.targetSite.siteUrl.indexOf('/')) {
            //     // 目标网站的起始路径 并不仅仅是host的名字,包含了项目名
            //     return false;
            // } else {
            //     return true;
            // }
            // TODO
            return true;
        }

        if (path.startsWith('.')) {
            // 相对路径
            return true;
        }

        // 锚点标签
        if (path.startsWith('#')) {
            return false;
        }

        // 剩下的就是相对当前位置的链接了
        return true;

    }

    obtainLocalFile() {

        let localFileName = this.path;

        if ('' === this.path || '/' === this.path) {
            // 这些路径的文件后缀添加index.html
            localFileName = path.resolve(localFileName, 'index.html');
        }
        if (_path.extname(this.path) === '') {
            // 没有扩展名的情况
            // 正常来说没有扩展名的一般都是网页
            // css js img 这些很少会有没有扩展名的情况，除非这些请求地址是程序生成的返回内容
            switch (this.type) {
                case 'html':
                    // TODO 这个地方有个问题
                    // 有的是请求的路径 其实是一个文件夹，就是其后还有子path会被请求到
                    // 这种情况应该是添加index.html
                    // 但是有的路径就是一个完全的路径了，其后不会有子path了
                    // 这种情况是应该添加.html
                    // localFileName = localFileName.concat('.html');
                    break;
                case 'css':
                case 'script':
                case 'img':
                default:

            }
        }

        let rootDir = this.targetSite.rootDir;

        localFileName = path.resolve(this.belongPath, localFileName);
        return path.join(rootDir, localFileName);

    }

    // 给执行队列调用的方法
    async run() {

        try {

            let requestUrl = this.targetSite.siteUrl + this.path;

            if (this.targetSite.existPath(requestUrl)) {
                // 已经记录过的不会被再次拉取了,否则就会无止尽的循环了
                executeQueue.done();
                return;
            } else {
                this.targetSite.recordPath(requestUrl);
            }
            let res = await yuwangUtil.grabFile(requestUrl).catch(err => {
                // logger.info(err);
                logger.info(this.targetSite.siteUrl + this.path, ' 请求未成功');
            });

            //使用了executeQueue队列就必须调用这个方法
            //使用这个队列主要就是为了防止非常集中的访问网站导致网址封锁ip
            //因此访问完网站后就可以调用这个方法了
            executeQueue.done();

            // 请求不成功的时候res 是undefined
            // TODO 请求不成功的是否记录
            if (undefined !== res) {
                let localFileName = this.obtainLocalFile();

                await fileUtils.saveNewFile(localFileName, res.text);
                let $ = cheerio.load(res.text);

                if (this.isPage) {

                    let assetsResource = this.extractAssetsResource($, this.path);
                    let pageResource = this.extractPageResource($, this.path);

                    assetsResource = assetsResource.filter(function(value) {

                        return this.analysePath(value);
                    }, this);

                    pageResource = pageResource.filter(function(value) {
                        return this.analysePath(value);
                    }, this);

                    assetsResource.forEach(function(value) {
                        value.grab();
                    });

                    pageResource.forEach(function(value) {
                        value.grab();
                    });
                } else {
                    // 不是page的就不用继续拉取了
                    // cheerio也没法分析这种文件
                    // 不过这些文件中还是有可能含有其他的资源文件的
                    // 比如css 中会有图片的引用
                    // 目前还没有分析这种文件
                }
            }

        } catch (err) {
            // logger.error(res);
            logger.error(err);
        }
    }
}

module.exports = Resource;
