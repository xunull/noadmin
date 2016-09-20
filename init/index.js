var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var logger = global.thisapp.logger;
var uuid = require('node-uuid');

var User = require('../back.src/dao').User;
var UserMenu = require('../back.src/dao').UserMenu;
var AccessPath = require('../back.src/dao').AccessPath;
var UserAccessPath = require('../back.src/dao').UserAccessPath;

var initObj = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../properties/init.yaml')));

let adminUser = initObj.user_root;
let basicAccessPaths = initObj.basic_access_path;
let amdinBasicPath = initObj.admin_basic_access_path;

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
            logger.info('admin 用户已经存在');
        }
    }
});

(async function initAccessPath() {

    let allAccessPath = await AccessPath.getAllAccessPath();

    async function generate(tempAccessPath, parentDimension) {
        let dimension = parentDimension;
        let id=uuid.v4();
        if (undefined === parentDimension) {
            dimension = [id];
        } else {
            dimension.push(id);
        }
        tempAccessPath.id=id;
        tempAccessPath.dimension=dimension;
        let accessPath = await AccessPath.saveAccessPath(tempAccessPath.name, tempAccessPath.path,
            tempAccessPath.level, tempAccessPath.id,tempAccessPath.dimension, tempAccessPath.node);
        if (undefined !== tempAccessPath.sub) {
            logger.info(tempAccessPath.name);
            logger.info('有子path');
            // 有下层链接
            for (let subAccessPath of tempAccessPath.sub) {
                // 复制一个数组，否则这个for 循环内的都是相同的dimension
                let tempDimension=dimension.concat();
                generate(subAccessPath, tempDimension);
            }
        } else {

        }
    }

    try {
        if (0 === allAccessPath.length) {
            logger.info('admin basic access_path is null');
            logger.info('generate admin basic access_path');
            for (let tempAccessPath of basicAccessPaths) {
                generate(tempAccessPath);
            }
        } else {
            // 已经有access path了
            logger.info('basic access path has exist');
        }

    } catch (err) {
        console.log(err);
    }


})();

// 初始化用户的菜单
// UserMenu.getUserMenu('admin', function(err, userMenu) {
//     if (err) {
//         logger.info(err);
//     } else {
//         if (null === userMenu) {
//             logger.info('admin userMenu is null');
//             UserMenu.saveUserMenu('admin', adminMenu, function(err) {
//
//             });
//         } else {
//             logger.info("admin's userMenu is not null");
//             // 点号和[]没有优先级区别
//             // logger.info(userMenu.menuObj[0].sub_menu);
//         }
//     }
// });

// 初始化admin可以访问的path
// (async function initAdminPath() {
//     let adminPaths = await UserAccessPath.getUserPath('admin');
//     if (null === adminPaths) {
//         logger.info('admin basic access_path is null');
//         logger.info('generate admin basic access_path');
//
//         let adminPathArr = [];
//         for (let adminPath of amdinBasicPath) {
//             let accessPath = await AccessPath.saveAccessPath(adminPath.name, adminPath.path,
//                 adminPath.level, adminPath.id, adminPath.pid, adminPath.truth);
//             adminPathArr.push(accessPath._id);
//         }
//
//         await UserAccessPath.save('admin',adminPathArr);
//
//     } else {
//         logger.info('admin userMenu is not null');
//     }
// })();
