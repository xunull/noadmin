/**
 * 这里有递归创建多级目录的方法
 */

/**
 * 这里的文件操作都是使用的异步操作
 * 因为目标是抓取网络，不使用同步操作
 */
var fs = require('fs');

var logger = thisapp.getLogger('yuwang');

exports.saveNewFile = function(path, content) {

    return new Promise((resolve, reject) => {

        var reg = /^.*\//;
        var dir = reg.exec(path);
        logger.info(path);
        logger.info(dir);
        mkdir(dir[0].substring(0, dir[0].length - 1), function() {
            /**
             * 只会自动创建文件 不会自动创建目录
             */
            fs.writeFile(path, content, function(err) {
                if (err) {
                    logger.info(path + '文件保存失败');
                    reject(err);
                } else {
                    logger.info(path + '文件保存成功');
                    resolve();
                }
            });
        });

    });
};

exports.creteWriteStream = function(path) {
    return fs.createWriteStream(path);
};

/**
 * 已经存在的路径再次创建会报错，java好像不会
 * 创建多层级会报错
 */
var mkdir = function(path, callback) {
    fs.mkdir(path, function(err) {
        if (null === err) {
            // 创建成功了
            callback();
        } else {
            // console.log(err);
            if (err.errno === -17) {
                callback();
            } else {
                var reg = /^.*\//;
                var dir = reg.exec(path);
                if (null === dir) {} else {
                    mkdir(dir[0].substring(0, dir[0].length - 1), function() {
                        mkdir(path, callback);
                    });
                }
            }
        }
    });
};

exports.mkdir = mkdir;
