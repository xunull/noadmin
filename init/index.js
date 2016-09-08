var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var logger = global.thisapp.logger;

var User = require('../dao').User;
var UserMenu = require('../dao').UserMenu;
var AccessPath = require('../dao').AccessPath;
var UserAccessPath = require('../dao').UserAccessPath;

var initObj = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../properties/init.yaml')));

let adminUser = initObj.user_root;
let adminMenu = initObj.admin_basic_menu;
let amdinBasicPath = initObj.admin_basic_access_path;

logger.info(amdinBasicPath);

// 初始化用户
User.getUserByLoginName('admin', function(err, user) {
    if (err) {
        logger.info(err);
    } else {
        if (null === user) {
            // 没有admin用户
            let hmac = crypto.createHmac('sha256', global.thisapp.appConfigYaml.pass_salt);
            hmac.update(adminUser.pass);
            adminUser.pass = hmac.digest('hex');

            User.saveUser(adminUser, function(err, user) {
                if (err) {

                } else {
                    logger.info('amdin 用户初始化成功');
                }
            });
        } else {
            // 已存在admin用户
        }
    }
});

// 初始化用户的菜单
UserMenu.getUserMenu('admin', function(err, userMenu) {
    if (err) {
        logger.info(err);
    } else {
        if (null === userMenu) {
            logger.info('admin userMenu is null');
            UserMenu.saveUserMenu('admin', adminMenu, function(err) {

            });
        } else {
            logger.info("admin's userMenu is not null");
            // 点号和[]没有优先级区别
            // logger.info(userMenu.menuObj[0].sub_menu);
        }
    }
});

// 初始化admin可以访问的path
(async function initAdminPath() {
    let adminPaths = await UserAccessPath.getUserPath('admin');
    if (null === adminPaths) {
        logger.info('admin basic access_path is null');
        logger.info('generate admin basic access_path');

        let adminPathArr = [];
        for (let adminPath of amdinBasicPath) {
            let accessPath = await AccessPath.saveAccessPath(adminPath.name, adminPath.path,
                adminPath.level, adminPath.id, adminPath.pid, adminPath.truth);
            adminPathArr.push(accessPath._id);
        }

        await UserAccessPath.save('admin',adminPathArr);

    } else {
        logger.info('admin userMenu is not null');
    }
})();
