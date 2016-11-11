var path = require('path');
var basic = require('./basic');
var has = require('./has');
/**
 * 查找目录下的文件夹，在这些文件夹中 包含some文件(文件夹)
 * 返回这些目录路径
 * @param  {[type]}  dirname  [description]
 * @param  {[type]}  file [文件的路径]
 * @return {Promise}          [description]
 */
exports.findDirHasSome = async function(dirname, file) {
    let dirs = await exports.findDir(dirname);

    let resultArr = [];
    for (let dir of dirs) {
        let result = await has.hasFile(dir, file);
        if (result) {
            resultArr.push(dir);
        }
    }

    return resultArr;

    /**
     * 在arr.filter 中使用 await 是不起作用的
     */

    // return dirs.filter(async function(value) {
    //     let testResult = await has.hasFile(value, file);
    //     return testResult;
    // });
}

exports.searchDirNames = async function(dirname) {
    basic.isAbsolute(dirname);
    let resultArr=[];
    let files = await basic.lsDir(dirname);
    for(let file of files) {
        if(!file.startsWith('.')){
            let isDir = await basic.isDir(path.resolve(dirname,file));
            if(isDir) {
                resultArr.push(file);
            }
        }
    }
    return resultArr;
}

/**
 * 查找指定目录下的所有文件夹
 * 排出隐藏文件夹
 * @param  {[type]}  dirname [description]
 * @return {Promise}         [description]
 */
exports.findDir = async function(dirname) {
    basic.isAbsolute(dirname);
    let resultArr = [];
    let files = await basic.lsDir(dirname);
    for (let file of files) {
        if (!file.startsWith('.')) {
            let isDir = await basic.isDir(path.resolve(dirname, file));
            if (isDir) {
                resultArr.push(path.resolve(dirname, file));
            }
        }

    }
    return resultArr;
}

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
exports.findHiddenDir = async function(dirname) {
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
