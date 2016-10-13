var RoleMenu = require('../models').RoleMenu;

/**
 * 为mongoose 对象的save 方法的代理
 * @param  {[type]} roleMenu [description]
 * @return {[type]}          [description]
 */
exports.save = function(roleMenu, callback) {
    return new Promise((resolve, reject) => {
        roleMenu.save((err, roleMenu) => {
            if (undefined === callback) {
                if (err) {
                    reject(err);
                } else {
                    resolve(roleMenu);
                }
            } else {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, roleMenu);
                }
            }
        });
    });
}

exports.findMenu = function(roleid, callback) {
    return new Promise((resolve, reject) => {
        RoleMenu.findOne({
            roleid: roleid
        }, (err, roleMenu) => {
            if (undefined === callback) {
                if (err) {
                    reject(err);
                } else {
                    resolve(roleMenu);
                }
            } else {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, roleMenu);
                }
            }
        });
    })
}

exports.saveMenu = function(roleid, menus, callback) {
    let roleMenu = new RoleMenu();
    roleMenu.roleid = roleid;
    roleMenu.menus = menus;

    return new Promise((resolve, reject) => {
        roleMenu.save((err, roleMenu) => {
            if (err) {
                if (undefined === callback) {
                    reject(err);
                } else {
                    callback(err, null);
                }
            } else {
                if (undefined === callback) {
                    resolve(roleMenu);
                } else {
                    callback(null, roleMenu);
                }
            }
        });
    });

}
