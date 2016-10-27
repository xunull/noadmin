var logger = global.thisapp.logger;

exports.login = async function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let socketid = req.body.socketid;

    logger.info(username);
    logger.info(password);
    res.reply({data: 'fdafasfasfasf',ok:false});

}
