var config = global.thisapp.config;
var logger = global.thisapp.logger;
var User = require('../dao').User;

exports.index = function(req, res, next) {
    res.render('index', {

    });
};

exports.signin = function(req, res, next) {
    res.render('signin');
};

exports.userSignin = function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    console.log(password);
};

exports.signup = function(req, res, next) {
    res.render('signup');
    res.render('signin');
};

exports.userSignup = function(req, res, next) {
    console.log(req.body.username);
    console.log(req.body.password);
    User.save(req.body.username,req.body.password,function(){
        if(err){

        } else {
          logger.info('用户存储成功');
        }
    });
    next();
};
