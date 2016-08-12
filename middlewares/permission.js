var logger = global.thisapp.logger;

let whiteList=['/signin'];
let blackList=[];


exports.userRequired = function(req, res, next) {
    if (!req.session || !req.session.user) {

        if(whiteList.indexOf(req.path) !== -1 ){
          // 白名单中的路径放行
          next();
          return;
        }

        logger.info('用户没有登录');
        return res.status(403).send('forbidden!');
    } else {
    }
    next();
};
