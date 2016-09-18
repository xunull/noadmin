var AccessPath = require('../dao').AccessPath;
var UserAccessPath = require('../dao').UserAccessPath;
var config = global.thisapp.config;
var logger = global.thisapp.logger;


exports.getAllAccessPath = async function(req, res, next) {
    let allPath = await AccessPath.getAllAccessPath();
    let userPath = await UserAccessPath.getUserPath(req.params.username);
    let simpleTree = [];
    for (let path of allPath) {
        let temp = {};
        temp.id = path.id;
        temp.pid = path.pid;
        temp.name = path.name;
        simpleTree.push(temp);
    }

    res.send(simpleTree);
}

exports.getUserAccessPath = async function(req, res, next) {
    try {

        let username;
        if (undefined === req.params.username) {
            username = req.session.user.name;
        } else {
            username = req.params.username;
        }
        let allPath = await AccessPath.getAllAccessPath();
        let userPath = await UserAccessPath.getUserPath(username);

        console.log(username);
        console.log(req.session.user.name);
        console.log(userPath);
        userPath = userPath.paths;
        let allTree = [];
        for (let path of allPath) {
            let temp = {};
            temp.id = path.id;
            temp.pid = path.pid;
            temp.name = path.name;
            console.log(path._id.toString());
            if (userPath.includes(path._id.toString())) {
                temp.has = true;
            } else {
                temp.has = false;
            }

            allTree.push(temp);
        }

        res.send({
            allTree: allTree
        });
    } catch (err) {
        logger.error(err);
    }


}
