var UserMenu = require('../models').UserMenu;
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
