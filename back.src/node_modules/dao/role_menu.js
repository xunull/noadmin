var RoleMenu = require('../models').RoleMenu;
var RoleDao = require('./role');
var MenuDao = require('./menu');
var logger = global.thisapp.logger;

exports.getRoleMenuForFront = async function(roleName) {
    try {
        let userMenuids = await exports.findMenuByRoleName(roleName);

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

exports.findMenuByRoleName = async function(roleName) {

    let role = await RoleDao.getRoleByName(roleName);
    return exports.findMenu(role._id);
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
