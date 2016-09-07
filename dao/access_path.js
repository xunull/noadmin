var models = require('../models');
var AccessPath = models.AccessPath;
var logger= global.thisapp.logger;

exports.getUserPath = function(username, callback) {
    AccessPath.findOne({
        'username': username
    }, function(err, userMenu) {
        if (err) {
            callback(err);
        } else {
            callback(null, userMenu);
        }
    });
}

exports.saveAccessPath = function(name, path, level, id, pid,truth) {

    let accessPath = new AccessPath();
    accessPath.name = name;
    accessPath.path = path;
    accessPath.level = level;
    accessPath.id=id;
    accessPath.pid = pid;
    accessPath.truth=truth;

    accessPath.save(function(err, accessPath) {
        if (err) {
            logger.error(err);
        }
    });

}
