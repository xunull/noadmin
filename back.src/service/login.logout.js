var UserMenu = require('../dao').UserMenu;
var Role = require('../dao').Role;
var logger = global.thisapp.logger;
/**
 * [login description]
 * @param  {[type]} user monodb model user
 * @return {[type]}      [description]
 */
exports.login = async function(user, nosession) {
    try {
        // 1.save user
        nosession.set('user', user);
        // 2.查询用户的菜单,该菜单为前台样式的菜单
        let userMenu = await UserMenu.getUserMenuForFront('admin');
        nosession.set('userMenu', userMenu);
        // 3.查询用户的role
        let userRole = await Role.getRoleByUserId(user._id);
        nosession.set('userRole', userRole);
    } catch (err) {
        logger.error(err);
    }

}
