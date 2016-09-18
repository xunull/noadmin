var models = require('../models');
var UserAccessPath = models.UserAccessPath;
var logger = global.thisapp.logger;

exports.save = function(username, accessPaths) {
    return new Promise((resolve, reject) => {
        let userAccessPath = new UserAccessPath();
        userAccessPath.username = username;
        userAccessPath.paths = accessPaths;

        userAccessPath.save(function(err, userAccessPath) {
            if (err) {
                reject(err);
            } else {
                resolve(userAccessPath);
            }
        })
    })
}

exports.getUserPath = function(username, callback) {

    if (undefined === callback) {
        return new Promise((resolve, reject) => {
            UserAccessPath.findOne({
                'username': username
            }, function(err, userPath) {
                if (err) {
                    // callback(err);
                    reject(err);
                } else {
                    resolve(userPath);
                    // callback(null, userMenu);
                }
            });
        });
    } else {
        UserAccessPath.findOne({
            'username': username
        }, function(err, userPath) {
            if (err) {
                callback(err);
            } else {
                callback(null, userPath);
            }
        });
    }
}
