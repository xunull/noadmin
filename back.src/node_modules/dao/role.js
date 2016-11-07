var Role = require('../models').Role;
var UserRole = require('./user_role');

var logger = global.thisapp.logger;

exports.findAll = function() {
    return new Promise((resolve, reject) => {
        Role.find({}, (err, roles) => {
            if (err) {
                reject(err);
            } else {
                resolve(roles);
            }
        })
    });
}

exports.getRoleByUserId = async function(userid, callback) {
    let userRole = await UserRole.getUserRoleByUserObjectId(userid);
    let roles = [];
    for (let roleid of userRole.roleids) {
        let result = await exports.getRoleByRoleid(roleid);
        roles.push(result);
    }

    return roles;
}

exports.getRoleByRoleid = function(roleid) {
    return exports.getRoleByCommand({_id: roleid});
}

exports.getRoleByCommand = function(command, callback) {
    return new Promise((resolve, reject) => {
        Role.find(command, (err, role) => {
            if (err) {
                reject(err);
            } else {
                resolve(role);
            }
        });
    });
}

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
exports.save = function(name, description, parent, create_user, callback) {

    let role = new Role();
    role.name = name;
    role.description = description;
    role.parent = parent;
    role.create_user = create_user;

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
