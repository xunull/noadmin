var models = require('../models');
var AccessPath = models.AccessPath;
var logger = global.thisapp.logger;

exports.getTreeNode = function(pid) {
    return new Promise((resolve, reject) => {
        AccessPath.find({
            pid: pid
        }, (err, accessPath) => {
            if (err) {
                reject(err);
            } else {
                resolve(accessPath);
            }
        });
    });
}

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

/**
 * [saveAccessPath description]
 * @param  {[type]} name      [path 的名称]
 * @param  {[type]} uri      [path 的uri]
 * @param  {[type]} level     [path 的登记]
 * @param  {[type]} dimension [path 的id]
 * @param  {[type]} dimension [path 的维度]
 * @param  {[Boolean]} node      [path 是否是一个节点]
 * @return {[type]}           [promise 对象]
 */
exports.saveAccessPath = function(name, uri, level, id, pid, dimension) {

    let accessPath = new AccessPath();
    accessPath.name = name;
    accessPath.uri = uri;
    accessPath.level = level;
    accessPath.id = id;
    accessPath.dimension = dimension;
    accessPath.pid = pid;

    return new Promise((resolve, reject) => {

        accessPath.save(function(err, accessPath) {
            if (err) {
                reject(err);
            } else {
                resolve(accessPath);
            }
        });
    });
}
