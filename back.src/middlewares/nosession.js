var Nosession = require('../core/nosession');
var logger = global.thisapp.logger;
var config = global.thisapp.config;
var cookieParser = require('cookie-parser');

var nosession_store = require('../core/nosession_store');

let defaultCookieOption = {
    maxAge: 600000, // 十分钟
    httpOnly: true,
    path: '/',
    signed: true
}

exports.setSession = function(req, res, next) {
    // 这里面会包括session id
    // signedCookies 存储的都是签名过的cookie,
    // 没有使用签名的cookie 就是在cookies对象中
    let signedCookies = req.signedCookies;
    let nosessionid = signedCookies.nosessionid;

    if (undefined === nosessionid) {
        // 没有nosessionid
        req.nosession = new Nosession();
        req.nosessionid = req.nosession.nosessionid;
        res.cookie('nosessionid', req.nosessionid, defaultCookieOption);
        req.nosession.set('aaa', 111111);

    } else {
        // 有nosessionid
        req.nosession = nosession_store.getSession(nosessionid);
        req.nosessionid = req.nosession.nosessionid;

    }

    next();
}
