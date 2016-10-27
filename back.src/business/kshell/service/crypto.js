/**
 * 内容的加密和解密处理
 */
const uuid = require('node-uuid');

/**
 * 创建一个随机密码
 * @return {[type]} [description]
 */
exports.createPwd = function() {
    return uuid.v4();
}

/**
 * 创建一个随机的加密 盐字符串
 * @return {[type]} [description]
 */
exports.createSalt = function() {
    return uuid.v4();
}
