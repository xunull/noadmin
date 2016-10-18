var Dao = require('../dao');
var Role = Dao.Role;

var logger = global.thisapp.logger;

exports.getAll = async function(req, res, next) {
    let roles = await Role.findAll();
    res.send({ok: true, msg: '', data: roles});
}

exports.saveRole = async function(req, res, next) {

    let user = req.nosession.get('user');

    let role = await Role.save(req.body.name, req.body.description, req.body.parent, user._id);
    res.send({ok: true, msg: null, data: null});

}
