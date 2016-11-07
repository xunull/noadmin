var crypto = require('crypto');

exports.passwordHmac = function(password) {
    let hmac = crypto.createHmac('sha256', global.thisapp.appConfigYaml.pass_salt);
    hmac.update(password);
    return hmac.digest('hex');
}
