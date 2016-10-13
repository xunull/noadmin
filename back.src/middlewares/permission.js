var logger = global.thisapp.logger;
var config = global.thisapp.config;
let whiteList=['/signin','/login','/'];
let blackList=[];

exports.userRequired = function(req, res, next) {

    if(!config.permission) {
      // 没有启用权限验证
      next();
      return;
    }

    if (!req.nosession || !req.nosession.get('user')) {

        if(whiteList.indexOf(req.path) !== -1 ){
          // 白名单中的路径放行
          next();
          return;
        }

        logger.info('用户没有登录');
        res.status(403).send('forbidden!');
    } else {

    }
    next();
};
