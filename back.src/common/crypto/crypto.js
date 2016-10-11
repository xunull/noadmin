var crypto = require('crypto');
var ursa = require('ursa');
var Q = require('q');
var fs = require('fs');

/**
 * 使用密码加密指定数据
 * @param  {[type]} data            [description]
 * @param  {[type]} pwd             [description]
 * @param  {[type]} type            =          TODO 有时加密会问题,还不清楚 aes192 有没影响
 *                                  						openssl list-cipher-algorithms 在这里 没有 aes192
 *                                  						不过现在aes192 又不报错了
 * @param  {[type]} data_encoding   =             'utf8'   [description]
 * @param  {[type]} result_encoding =             'hex'    [description]
 * @return {[type]}                 [description]
 */
exports.cipher = function(data, pwd, type = 'aes-256-ecb', data_encoding = 'utf8', result_encoding = 'hex') {
    pwd = Buffer.from(pwd, 'utf8');
    var cipher = crypto.createCipher(type, pwd);
    // cipher.setAutoPadding(false);
    // 如果不指定 input_encoding 那么data 必须是一个buffer
    let cipherChunks = [];
    cipherChunks.push(cipher.update(data, data_encoding, result_encoding));
    cipherChunks.push(cipher.final(result_encoding));
    return cipherChunks.join('');
};

/**
 * 使用密码解密指定数据
 * @param  {[type]} data            [description]
 * @param  {[type]} pwd             [description]
 * @param  {[type]} type            =             'aes192' [description]
 * @param  {[type]} data_encoding   =             'hex'    [description]
 * @param  {[type]} result_encoding =             'utf8'   [description]
 * @return {[type]}                 [description]
 */
exports.decipher = function(data, pwd, type = 'aes-256-ecb', data_encoding = 'hex', result_encoding = 'utf8') {
    pwd = Buffer.from(pwd, 'utf8');
    console.log('解密的data为:');
    console.log(data);
    console.log('解密的密码为:');
    console.log(pwd);
    var decipher = crypto.createDecipher(type, pwd);
    // decipher.setAutoPadding(true);
    let cipherChunks = [];
    cipherChunks.push(decipher.update(data, data_encoding, result_encoding));
    cipherChunks.push(decipher.final(result_encoding));
    return cipherChunks.join('');
};

/**
 * 创建一个rsa对象
 * 该对象包含一个rsa 私钥(使用私钥可以得到公钥)
 * 自己加密的信息都只有对方的秘钥才能解开，不过因为可以从私钥中提取出公钥，
 * 因此私钥加密的数据,私钥自己也是可以解开的
 * 并包含 私钥，公钥的pem文本
 * @param  {[type]} modulusBits =             2048  [description]
 * @param  {[type]} exponent    =             65537 [description]
 * @return {[type]}             [description]
 */
exports.createRSA = function(modulusBits = 2048, exponent = 65537) {
    var private_key = ursa.generatePrivateKey(modulusBits, exponent);

    var rsa = {
        private_key: private_key,
        private_str: private_key.toPrivatePem().toString(),
        public_str: private_key.toPublicPem().toString()
    };

    return rsa;
};

/**
 *  使用私钥加密
 *  data是buffer 类型
 *  返回值是buffer类型
 */
exports.privateEncrypt = function(private_str, data) {
    return crypto.privateEncrypt(private_key, data);
};

/**
 * 	使用私钥解密
 *  data是buffer 类型
 *  返回值是buffer类型
 */
exports.privateDecrypt = function(private_str, data, encoding = 'utf8') {
    if ('string' === typeof data) {
        // console.log('原来的数据为:');
        // console.log(data);
        data = Buffer.from(data, encoding);
        // console.log('现在的数据为:');
        // console.log(data);
    }
    return crypto.privateDecrypt(private_str, data);
};

/**
 *
 *  data是buffer 类型
 *  返回值是buffer类型
 */
exports.publicEncrypt = function(public_str, data) {
    if ('string' === typeof data) {
        // console.log('原来的数据为:');
        // console.log(data);
        data = Buffer.from(data, 'utf8');
        // console.log('现在的数据为:');
        // console.log(data);
    }

    return crypto.publicEncrypt(public_str, data);
};

/**
 *  data是buffer 类型
 *  返回值是buffer类型
 */
exports.publicDecrypt = function(public_str, data) {
    return crypto.publicDecrypt(public_str, data);
};
