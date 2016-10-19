var Dao = require('../dao');
var User = Dao.User;

exports.getAllUser = async function(req, res, next) {
    try {
        let users = await User.getAll();
        res.send({ok: true, msg: '', data: users});
    } catch (err) {
        res.send({ok: false, msg: '获取用户出错', data: null});
    }
}
