var models = require('../models');
var AccessPath = models.AccessPath;
var logger = global.thisapp.logger;

exports.getAllAccessPath = function(callback) {
    if (undefined === callback) {
        return new Promise((resolve, reject) => {
            AccessPath.find({}, function(err, userPath) {
                if (err) {
                    reject(err);
                } else {
                    resolve(userPath);
                }
            });
        });
    } else {
        AccessPath.find({}, function(err, userPath) {
            if (err) {
                callback(err);
            } else {
                callback(null, userPath);
            }
        });
    }
}

exports.getUserPath = function(username, callback) {

    if (undefined === callback) {
        return new Promise((resolve, reject) => {
            AccessPath.findOne({
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
        AccessPath.findOne({
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

exports.saveAccessPath = function(name, path, level, id, pid, truth) {

    let accessPath = new AccessPath();
    accessPath.name = name;
    accessPath.path = path;
    accessPath.level = level;
    accessPath.id = id;
    accessPath.pid = pid;
    accessPath.truth = truth;

    accessPath.save(function(err, accessPath) {
        if (err) {
            logger.error(err);
        }
    });

}
