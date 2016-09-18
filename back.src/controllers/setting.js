
var User = require('../dao').User;
var UserMenu = require('../dao').UserMenu;

var config = global.thisapp.config;
var logger = global.thisapp.logger;

exports.index = function(req, res, next) {
    var session = req.session;
    logger.info(session.user);

    UserMenu.getUserMenu('admin',function(err,userMenu){
      if(err) {
        logger.error(err);
      } else {
        res.render('mergePage.ejs', {userMenu:userMenu.menuObj});
      }
    });
};
