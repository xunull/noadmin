var models = require('../models');
var User = models.User;


exports.getUserByLoginName = function(loginname,callback) {
    // 主要是为了大小写的忽略
    User.findOne({'loginname':new RegExp('^'+loginname+'$','i')},callback);
};
