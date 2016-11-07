const fs = require('fs');
const path = require('path');

/**
 * 判断一个路径是否以../开头
 * 这样开头的路径 会回退到上级目录
 * @param  {[type]}  arg_path [description]
 * @return {Boolean}          [description]
 */
exports.isReturnPrefix = function(arg_path) {
    return arg_path.startsWith('../');
}

/**
 * 保存内容到文件
 * @param  {[type]} data     [description]
 * @param  {[type]} arg_path [description]
 * @param  {[type]} option   [description]
 * @return {[type]}          [description]
 */
exports.writeFile = function(arg_path, data, option) {
    isAbsolute(arg_path);
    return new Promise((resolve, reject) => {
        // if (typeof data === 'string')
        fs.writeFile(arg_path, data, err => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

/**
 * 包装fs的readFile方法
 * 读取一个文件,返回一个promise
 * @param  {[type]} arg_path [description]
 * @return {[type]}          [description]
 */
exports.readFile = function(arg_path, option) {
    isAbsolute(arg_path);
    return new Promise((resolve, reject) => {
        if (undefined === option) {
            fs.readFile(arg_path, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        } else {
            fs.readFile(arg_path, option, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        }

    });
}

/**
 * 判断是不是目录
 * @param  {[type]}  arg_path [description]
 * @return {Boolean}          [description]
 */
exports.isDir = async function(arg_path) {
    isAbsolute(arg_path);
    let stats = await exports.stat(arg_path);
    return stats.isDirectory();
}

/**
 * 判断是不是文件
 * @param  {[type]}  arg_path [description]
 * @return {Boolean}          [description]
 */
exports.isFile = async function(arg_path) {
    isAbsolute(arg_path);
    let stats = await exports.stat(arg_path);
    return stats.isFile();
}

exports.stat = function(arg_path) {
    isAbsolute(arg_path);
    return new Promise((resolve, reject) => {
        fs.stat(arg_path, (err, stats) => {
            if (err) {
                reject(err);
            } else {
                resolve(stats);
            }
        });
    });
}

/**
 * 判断一个路径是否是绝对路径
 * @param  {[type]}  arg_path [description]
 * @return {Boolean}          [description]
 */
function isAbsolute(arg_path) {

    if (!path.isAbsolute(arg_path)) {
        throw new FileEnhanceException('path can\'t a relative path');
    } else {
        return true;
    }

};

exports.isAbsolute = isAbsolute;

/**
 * 判断一个给定的路径是否存在
 * @param  {[type]}  arg_path [description]
 * @return {Boolean}          [description]
 */
exports.isExists = function(arg_path) {
    isAbsolute(arg_path);
    return new Promise((resolve, reject) => {
        fs.access(arg_path, fs.constants.F_OK, (err) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

/**
 * 判断一个给定的路径是否是文件夹
 * 如果不是，并没有给予出是什么
 * @param  {[type]}  arg_path [description]
 * @return {Boolean}          [description]
 */
exports.isDir = function(arg_path) {
    isAbsolute(arg_path);
    return new Promise((resolve, reject) => {
        fs.stat(arg_path, (err, stat) => {
            if (err) {
                reject(err);
            } else {
                if (stat.isDirectory()) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });
    });
}

/**
 * 列举出一个目录下的子内容
 * @param  {[type]} dirname [description]
 * @return {[type]}         [description]
 */
exports.lsDir = function(dirname) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
}

/**
 * 发现在给定的文件夹目录下的子文件夹中的index文件，
 * 返回这些index文件的绝对路径
 * 查找index文件一般是为了加载该目录使用
 *
 * TODO js的方法能知道调用的他的方法么,有方法栈么
 * @param  {[type]} dirname [description]
 * @return {[type]}         [description]
 */
exports.findDirIndex = async function(dirname) {
    isAbsolute(dirname);
    let resultArr = [];
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    }).then(async function(files) {
        for (file of files) {
            let isDir = await exports.isDir(path.resolve(dirname, file));
            if (isDir) {
                // 只有文件夹才有必要去寻找是否有index文件
                let isExist = await exports.isExists(path.resolve(dirname, file, 'index.js'));
                if (isExist) {
                    resultArr.push(path.resolve(dirname, file, 'index.js'));
                }

            }
        }
        return resultArr;
    });
};

function FileEnhanceException(message) {
    this.message = message;
    this.name = 'FileEnhanceException';
}
