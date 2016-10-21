const fs = require('fs');
const file = require('../file');
const yaml = require('js-yaml');

/**
 * 从文件中读取出对象
 * @param  {[type]}  arg_path [description]
 * @return {Promise}          [description]
 */
exports.safeLoadFile = async function(arg_path) {
    let fileData = await file.readFile(arg_path);
    return yaml.safeLoad(fileData);
}

/**
 * 将对象报错到文件中
 * @param  {[type]} obj      [description]
 * @param  {[type]} arg_path [description]
 * @return {[type]}          [description]
 */
exports.safeDumpFile = async function(obj, arg_path) {
    let fileData = yaml.safeDump(obj);
    await file.writeFile(arg_path, fileData);
}
