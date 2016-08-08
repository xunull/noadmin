var config = global.thisapp.config;
var logger = global.thisapp.logger;

exports.index = function(req, res, next) {
    res.render('index', {

    });
};

exports.login = function(req, res, next) {
    res.render('login');
};
