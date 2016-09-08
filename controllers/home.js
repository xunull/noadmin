var User = require('../dao').User;
var UserMenu = require('../dao').UserMenu;
var crypto = require('../basic/crypto');
var config = global.thisapp.config;
var logger = global.thisapp.logger;


exports.index = function(req, res, next) {
    var session = req.session;
    logger.info(session.user);
    if (!session.user) {
        res.redirect('/signin');
    } else {
        UserMenu.getUserMenu('admin', function(err, userMenu) {
            if (err) {
                logger.error(err);
            } else {
                res.render('index.ejs', {
                    userMenu: userMenu.menuObj
                });
            }
        });
    }

};

exports.signin = function(req, res, next) {
    res.render('signin');
};

exports.userSignin = function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    console.log(password);

    User.getUserByLoginName(req.body.username, function(err, user) {

        if (err) {

        } else {
            password=crypto.passwordHmac(password);
            if (password == user.pass) {
                logger.info('密码验证成功');
                var session = req.session;
                session.user = user;
                res.send({
                    res_code: 200
                });
            } else {
                logger.info('密码验证失败');
                res.send({
                    res_code: 500
                });
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
        if (err) {

        } else {
            logger.info('用户存储成功');
        }
    });
    next();
};
