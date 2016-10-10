var Role = require('../models').Role;

var logger = global.thisapp.logger;

exports.getRoleByName = function(name, callback) {
    if (undefined === callback) {
        return new Promise((resolve, reject) => {
            Role.findOne({
                'name': name
            }, (err, role) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(role);
                }
            });
        });
    } else {
        Role.findOne({
            'name': name
        }, (err, role) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, role);
            }
        });
    }
}

/**
 * 保存一条role记录
 * @param  {[type]} name        [description]
 * @param  {[type]} description [description]
 * @param  {[type]} parent      [description]
 * @return {[type]}             [description]
 */
exports.save = function(name, description, parent, callback) {

    let role = new Role();
    role.name = name;
    role.description = description;
    role.parent = parent;

    if (undefined === callback) {
        return new Promise((resolve, reject) => {
            role.save((err, role) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(role);
                }
            });
        });
    } else {
        role.save((err, role) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, role);
            }
        });
    }

}
