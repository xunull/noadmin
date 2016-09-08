var AccessPath = require('../dao').AccessPath;

var config = global.thisapp.config;
var logger = global.thisapp.logger;


exports.getAllAccessPath = async function(req, res, next) {
    let allPath = await AccessPath.getAllAccessPath();

    console.log(allPath);
    res.end();
}

exports.getUserAccessPath = async function(req, res, next) {
    let userPaths = await AccessPath.getUserPath(req.params.username);

    console.log(userPaths);
    res.end();
}
