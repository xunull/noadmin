var User = require('../dao').User;
var UserMenu = require('../dao').UserMenu;
var crypto = require('../basic/crypto');
var config = global.thisapp.config;
var logger = global.thisapp.logger;
var nosession = require('../core/nosession');
var ClientObj = require('../basic/client_obj');

exports.index = async function(req, res, next) {

    try {
        var nosession = req.nosession;
        if (!nosession.get('user')) {
            res.redirect('/signin');
            logger.info('用户没有登陆');
        } else {
            logger.info('用户已经登陆了');
            try {
                let clientObj = new ClientObj();
                clientObj.userMenu = req.nosession.get('userMenu');
                clientObj.loginUser = req.nosession.get('user');
                res.render('index.ejs', {clientObj: clientObj});
            } catch (err) {
                logger.error(err);
            }
        }
    } catch (err) {
        logger.error(err);
    }

};

exports.signin = function(req, res, next) {
    res.render('signin');
};

exports.userSignin = function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;

    // 因为await 在回调方法内，因此需要在这个回调方法前加async
    // 必须在其第一个外面的方法上加，跨级是不行的
    User.getUserByLoginName(req.body.username, async function(err, user) {

        if (err) {} else {
            password = crypto.passwordHmac(password);
            if (password == user.pass) {
                logger.info('密码验证成功');

                // 查询用户的菜单
                let userMenu = await UserMenu.getUserMenuForFront('admin');

                req.nosession.set('user', user);
                req.nosession.set('userMenu', userMenu);
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
