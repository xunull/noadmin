var path = require('path');
var basic = require('./basic');

/**
 * 搜索指定路径下的所有隐藏文件,
 * 当然目录也有可能是隐藏的
 * 查询出来的只是文件名，不是全路径
 * @return {Promise} [description]
 */
exports.findHidden = async function(dirname) {
    basic.isAbsolute(dirname);
    let files = await basic.lsDir(dirname);
    return files.filter(function(value, index, array) {
        if (value.startsWith('.')) {
            return true;
        };
    });

}

/**
 * 查找目录下的隐藏文件夹，返回的是文件夹的名称
 * @param  {[type]} dirname [description]
 * @return {[type]}         [description]
 */
exports.findHiddenDir =async function(dirname) {
    basic.isAbsolute(dirname);
    let hidden = await exports.findHidden(dirname);
    let dirs = hidden.filter(async(value, index, array) => {
        let result = await basic.isDir(path.resolve(dirname, value));
        return result;
    });
    return dirs;
};

/**
 * 查找目录下的隐藏文件，返回的是文件名的集合
 * @param  {[type]}  dirname [description]
 * @return {Promise}         [description]
 */
exports.findHiddenFile = async function(dirname) {
    basic.isAbsolute(dirname);
    let hidden = await exports.findHidden(dirname);
    let files = hidden.filter(async(value, index, array) => {
        let result = await basic.isFile(path.resolve(dirname, value));
        return result;
    });
    return files;
}
