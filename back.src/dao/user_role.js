var UserRole = require('../models').UserRole;
var User = require('./user');

var logger = global.thisapp.logger;

/**
 * TODO 怎么定义对于不同情况下的方法返回值。
 *
 */

exports.getUserRoleByUserName = async function(username) {
    let user = await User.getUserByLoginName(username);
    if (null === user) {
        return null;
    }
    let userRole = await exports.getUserRoleByUserObjectId(user._id);

    return userRole;

}

exports.getUserRoleByUserObjectId = async function(objectId, callback) {

    return new Promise((resolve, reject) => {
        UserRole.findOne({
            userid: objectId
        }, (err, userRole) => {
            if (err) {
                reject(err);
            } else {
                resolve(userRole);
            }
        });
    });
}

exports.save = function(userid, roleids, callback) {
    let userRole = new UserRole();
    userRole.userid = userid;
    userRole.roleids = roleids;
    if (undefined === callback) {
        return new Promise((resolve, reject) => {
            userRole.save((err, userRole) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(userRole);
                }
            })
        });
    } else {
        userRole.save((err, userRole) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, userRole);
            }
        })
    }
}
