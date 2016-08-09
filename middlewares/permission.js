var logger = global.thisapp.logger;

exports.userRequired = function(req, res, next) {
    if (!req.session || !req.session.user) {
        logger.info('用户没有登录');
        return res.status(403).send('forbidden!');
    } else {
        logger.info('用户已经登录');
    }
    next();
};
