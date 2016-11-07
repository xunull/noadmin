/**
 * path 增强
 *
 */
const file = require('../file');

/**
 * 从一个文件路径中提取出最后一个文件夹的名字
 * 如果最后一个是文件夹，那么就会返回最后的一个
 * 否则返回倒数第二个
 * @param  {[type]} arg_path [description]
 * @return {[type]}          [description]
 */
exports.findLastDirName = async function(arg_path) {
    let testResult = await file.isDir(arg_path);
    let arr = arg_path.split('/');
    if (testResult) {
        return arr[arr.length - 1];
    } else {
        return arr[arr.length - 2];
    }
}
