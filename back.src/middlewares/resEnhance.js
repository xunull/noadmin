/**
 * express res 对象增强
 */
exports.addReply = function(req, res, next) {
    /**
     * 如果参数 是undefined 那么 res.json并不会将该参数传递出去
     * reply 默认是传递正确执行的结果,只需要传递data就可以
     * 如果一个参数都不给出,那么就表明是一个正确的结果
     */
    res.reply = function({
        ok = true,
        data = null,
        error_code = 0,
        error_msg = ''
    }) {

        res.json({ok: ok, data: data, error_code: error_code, error_msg: error_msg});
    }
    next();
}