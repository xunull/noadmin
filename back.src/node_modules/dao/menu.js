var models = require('../models');
var Menu = models.Menu;
var uuid = require('node-uuid');

var logger = global.thisapp.logger;

exports.getMenuByMenuid = function(menuid, callback) {

    return new Promise((resolve, reject) => {
        Menu.findOne({
            _id: menuid
        }, (err, menu) => {
            if (err) {
                if (undefined === callback) {
                    reject(err);
                } else {
                    callback(err, null);
                }
            } else {
                if (undefined === callback) {
                    resolve(menu);
                } else {
                    callback(null, menu);
                }
            }
        });
    });

}

exports.getUserMenu = function(userid) {};

exports.findAllMenu = function(callback) {
    if (undefined === callback) {
        return new Promise((resolve, reject) => {
            Menu.find({}, (err, menus) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(menus);
                }
            });
        });
    } else {
        Menu.find({}, (err, menus) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, menus);
            }
        });
    }
}

exports.saveMenu = function(name, level, menu_icon, uri, pmenuid, callback) {

    let menu = new Menu();
    menu.name = name;
    menu.level = level;
    menu.menu_icon = menu_icon;
    menu.uri = uri;
    menu.pmenuid = pmenuid;

    if (undefined === callback) {
        return new Promise((resolve, reject) => {
            menu.save(function(err, menu) {
                if (err) {
                    reject(err);
                } else {
                    resolve(menu);
                }
            });
        });
    } else {
        menu.save(function(err, menu) {
            if (err) {
                callback(err, menu);
            } else {
                callback(null, menu);
            }
        });
    }
};
