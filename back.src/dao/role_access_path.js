var RoleAccessPath = require('../models').RoleAccessPath;

var logger = global.thisapp.logger;

exports.getAccessPathByRoleid = function(roleid, callback) {
    if (undefined === callback) {

        return new Promise((resolve, reject) => {
            RoleAccessPath.findOne({
                roleid: roleid
            }, (err, roleAccessPath) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(roleAccessPath);
                }
            });
        });

    } else {
        RoleAccessPath.findOne({
            roleid: roleid
        }, (err, roleAccessPath) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, roleAccessPath);
            }
        });
    }

};

exports.save = async function(roleid, whitelist, blacklist, callback) {
    var roleAccessPath = new RoleAccessPath();
    roleAccessPath.roleid = roleid;
    roleAccessPath.whitelist = whitelist;
    roleAccessPath.blacklist = blacklist;

    if (undefined === callback) {
        return new Promise((resolve, reject) => {
            roleAccessPath.save((err, roleAccessPath) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(roleAccessPath);
                }
            });
        });
    } else {
        roleAccessPath.save((err, roleAccessPath) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, roleAccessPath);
            }
        });
    }
}
