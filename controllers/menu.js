var Menu = require('../dao').Menu;

var logger = global.thisapp.logger;


/**
 * 设置菜单的页面
 * @return {[type]} [description]
 */
exports.menuPage = function(req, res, next) {

};

/**
 * 用户获取自己可用的菜单
 * @return {[type]} [description]
 */
exports.getUserMenu = function(req, res, next) {
    logger.info('getUserMenu');
    res.send({
        username: req.params.username
    });
};

/**
 * admin 添加菜单
 * @return {[type]} [description]
 */
exports.addMenu = function(req, res, next) {

};

/**
 * 设置某个用户的菜单
 * @return {[type]} [description]
 */
exports.setUserMenu = function(req, res, next) {

};

/**
 * 删除某个用户的菜单
 * @return {[type]} [description]
 */
exports.deleteUserMenu = function(req, res, next) {

};

/**
 * root 删除某个菜单
 * @return {[type]} [description]
 */
exports.deleteMenu = function(req, res, next) {

};
