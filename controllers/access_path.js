var AccessPath = require('../dao').AccessPath;
var UserAccessPath = require('../dao').UserAccessPath;
var config = global.thisapp.config;
var logger = global.thisapp.logger;


exports.getAllAccessPath = async function(req, res, next) {
    let allPath = await AccessPath.getAllAccessPath();

    console.log(allPath);
    res.send(allPath);
}

exports.getUserAccessPath = async function(req, res, next) {
    let userPaths = await UserAccessPath.getUserPath(req.params.username);
    
    console.log(userPaths);
    res.end(userPaths);
}
