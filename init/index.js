var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var logger = global.thisapp.logger;

var User = require('../dao').User;

var initObj = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../properties/init.yaml')));

let adminUser = initObj.user_root;
let adminMenu = initObj.admin_basic_menu;

logger.info(adminUser);

User.getUserByLoginName('admin', function(err, user) {
    if (err) {
        logger.info(err);
    } else {
        if(null === user) {
            // 没有admin用户
            let hmac = crypto.createHmac('sha256', global.thisapp.appConfigYaml.pass_salt);
            hmac.update(adminUser.pass);
            adminUser.pass=hmac.digest('hex');

            User.saveUser(adminUser,function(err,user){
              if(err){

              } else {
                logger.info('amdin 用户初始化成功');
              }
            });
        } else {
            // 已存在admin用户
        }
    }
});

logger.info(adminMenu);
