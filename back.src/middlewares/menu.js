/**
 * 生成用户menu的方法，该menu 为前端使用的格式
 * 正常来说此方法只有可能是在用户登陆后调用,而且也只是在登陆后调用一次
 * 当成中间件却有不妥，
 * 但是可能有时候会使用调试模式，或者对于某些特殊的url的时候
 * 不过这个时候，应该有专门的debug中间件
 * @return {Promise} [description]
 */
exports.generateUserMenu = async function generateUserMenu(req, res, next) {

    if (undefined !== req.nosession.get('user')) {} else {}

    next();
}
