var models = require('../models');
var User = models.User;
var uuid = require('uuid');

var logger = global.thisapp.logger;


exports.getUserByLoginName = function(loginname, callback) {
    // 主要是为了大小写的忽略
    User.findOne({
        'loginname': new RegExp('^' + loginname + '$', 'i')
    }, function(err,user){
      if(err) {
        callback(err);
      } else {
        callback(null,user);
      }
    });
};

exports.save = function(username, password, callback) {
    var user = new User();
    user.loginname = username;
    user.pass = password;
    user.accessToken = uuid.v4();
    user.save(function(err,user){
      if(err) {
        logger.error(err);
        // 这里的err 不一定是原来数据库抛出的err,有可能替换成平台定义的err
        callback(err,user);
      } else {
        callback(null,user);
      }
    });
};