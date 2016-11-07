/**
 * 只负责提取session
 * 目前还会判断session 是否过期，如果过期了会自动重新生成一个新的session
 */

var Nosession = require('../core/nosession');
var logger = global.thisapp.logger;
var config = global.thisapp.config;
var cookieParser = require('cookie-parser');

var nosession_store = require('../core/nosession_store');

// nosessionid 不能仅仅是httponly
// 否则ajax请求携带不了该session会被禁止访问
let defaultCookieOption = {
    maxAge: 1200000, // 十分钟
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

    } else {
        // 有nosessionid,但是本系统中不一定会有
        // 比如，当服务器重启后，session 已经被清空了

        let storedSession = nosession_store.getSession(nosessionid);

        if (undefined === storedSession) {
            req.nosession = new Nosession();
            req.nosessionid = req.nosession.nosessionid;
            res.cookie('nosessionid', req.nosessionid, defaultCookieOption);
        } else {
            if (Date.now() > storedSession.expires_on) {
                // session 已经过期
                // 销毁上次的session
                storedSession.destory();

                req.nosession = new Nosession();
                req.nosessionid = req.nosession.nosessionid;
                res.cookie('nosessionid', req.nosessionid, defaultCookieOption);
            } else {
                req.nosession = nosession_store.getSession(nosessionid);
                req.nosessionid = req.nosession.nosessionid;
                // 刷新一下cookie中 sessionid 的时间
                res.cookie('nosessionid', req.nosessionid, defaultCookieOption);
            }
        }
    }
    next();
}
