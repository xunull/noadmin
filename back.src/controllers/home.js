var User = require('../dao').User;
var UserMenu = require('../dao').UserMenu;
var crypto = require('../basic/crypto');
var config = global.thisapp.config;
var logger = global.thisapp.logger;
var nosession = require('../core/nosession');
var ClientObj = require('../basic/client_obj');

exports.index = async function(req, res, next) {
    var session = req.session;
    if (!session.user) {
        res.redirect('/signin');
    } else {
        try {
            userMenu = await UserMenu.getUserMenu('admin');
            let clientObj = new ClientObj();
            clientObj.userMenu = userMenu.menuObj;
            clientObj.loginUser = session.user;
            res.render('index.ejs', {clientObj: clientObj});
        } catch (err) {
            logger.error(err);
        }
    }
};

exports.signin = function(req, res, next) {
    res.render('signin');
};

exports.userSignin = function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;

    User.getUserByLoginName(req.body.username, function(err, user) {

        if (err) {} else {
            password = crypto.passwordHmac(password);
            if (password == user.pass) {
                logger.info('密码验证成功');
                var session = req.session;
                session.user = user;
                res.send({res_code: 200});
            } else {
                logger.info('密码验证失败');
                res.send({res_code: 500});
            }
        }
    });
};

exports.signup = function(req, res, next) {
    res.render('signup');
    res.render('signin');
};

exports.userSignup = function(req, res, next) {
    console.log(req.body.username);
    console.log(req.body.password);
    User.save(req.body.username, req.body.password, function(err, user) {
        if (err) {} else {
            logger.info('用户存储成功');
        }
    });
    next();
};
