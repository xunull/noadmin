var UserMenu = require('../models').UserMenu;
var MenuDao = require('./menu');
var logger = global.thisapp.logger;

exports.getUserMenu = function(username, callback) {

    return new Promise((resolve, reject) => {
        UserMenu.findOne({
            'username': username
        }, function(err, userMenu) {
            if (err) {
                // callback(err);
                reject(err);
            } else {
                // callback(null, userMenu);
                resolve(userMenu);
            }
        });
    });

};

/**
 * 此函数的返回值，是直接传递给前台的
 * @param  {[type]} username [description]
 * @return {[type]}          [description]
 */
exports.getUserMenuForFront = async function(username) {

    try {
        let userMenuids = await exports.getUserMenu(username);

        let dbmenus = [];
        for (let menuid of userMenuids.menus) {
            let tempMenu = await MenuDao.getMenuByMenuid(menuid);
            dbmenus.push(tempMenu);
        }
        // 返回的menu结果
        let resultMenu = [];

        generateMenu(resultMenu, '0', dbmenus);
        return resultMenu;
    } catch (err) {
        logger.error(err);
    }

    function generateMenu(parent, pid, dbmenus) {

        let childrenMenu = dbmenus.filter((element, index, array) => {

            if (pid === element.pmenuid) {
                return true;
            } else {
                return false;
            }
        });

        childrenMenu.forEach(function(currentValue, index, array) {
            let formatedMenu = {};
            parent.push(formatedMenu);
            formatedMenu.menu_icon = currentValue.menu_icon;
            formatedMenu.name = currentValue.name;
            formatedMenu.uri = currentValue.uri;
            formatedMenu.sub_menu = [];
            /**
             * currentValue._id.valueOf() 的类型是object
             * currentValue._id.valueOf().toString() 才是字符串
             */
            generateMenu(formatedMenu.sub_menu, currentValue._id.valueOf().toString(), dbmenus);
        });
    }

}

exports.saveUserMenu = function(username, menuids, callback) {
    if (undefined === callback) {
        return new Promise((resolve, reject) => {
            UserMenu.findOne({
                'username': username
            }, function(err, userMenu) {
                if (err) {
                    reject(err);
                } else {
                    if (null === userMenu) {
                        // 还没有此用户
                        userMenu = new UserMenu();
                        userMenu.username = username;
                        userMenu.menus = menuids;

                    } else {
                        // 已经有此用户
                        userMenu.menus = menuids;
                    }
                    userMenu.save(function(err, userMenu) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(userMenu);
                        }
                    });
                }
            });
        })

    } else {
        UserMenu.findOne({
            'username': username
        }, function(err, userMenu) {
            if (err) {
                callback(err);
            } else {
                if (null === userMenu) {
                    // 还没有此用户
                    userMenu = new UserMenu();
                    userMenu.username = username;
                    userMenu.menus = menuids;

                } else {
                    // 已经有此用户
                    userMenu.menus = menuids;
                }
                userMenu.save(function(err, userMenu) {
                    if (err) {
                        logger.info(username, ' 菜单保存失败 ');
                        callback(err);
                    } else {
                        logger.info(username, ' 菜单保存成功 ');
                        callback(null);
                    }
                });
            }
        });
    }

};
