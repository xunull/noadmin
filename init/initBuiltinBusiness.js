var fs = require('fs');
var path = require('path');
var logger = global.thisapp.logger;
var config = global.thisapp.config;
var uuid = require('node-uuid');

var basicDao = require('../back.src/dao');
var initBusinessYamlPath = config.init.initBusinessYamlPath;

var Menu = basicDao.Menu;
var Role = basicDao.Role;
var UserRole = basicDao.UserRole;
var RoleMenu = basicDao.RoleMenu;
var Business = basicDao.Business;
const yaml = global.thisapp.common.yaml;

(async function init() {
    try {

        var initObj = await yaml.safeLoadFile(initBusinessYamlPath);
        if (undefined === initObj.initOver) {
            logger.info('built in business has not init');
            // 内建业务所有角色的yaml 初始化对象
            // 1.初始化一个 内建业务所属的角色
            let initRole = initObj.role_builtinBusiness;
            let storedRole = await initBuiltInBusinessRole(initRole);

            // 2.初始化内建业务
            let business = initObj.builtin_business;
            await initBusinessRecord(business);

            // 3.初始化业务的菜单
            let businessMenus = initObj.business_menu;
            await initMenu(businessMenus);

            initObj.initOver = true;
            // yaml.safeDumpFile(initObj, initBusinessYamlPath);
        } else {
            logger.info('内建业务逻辑已经初始化过');
        }

    } catch (err) {
        logger.error(err);
    }
})();

/**
 * 1.创建一个内建业务的角色
 * @return {Promise} [description]
 */
async function initBuiltInBusinessRole({name,description,parent}) {
    let role = await Role.save(name, description, parent);
    logger.info(role);
    return role;
}

/**
 * 2.创建内建业务记录
 * @return {Promise} [description]
 */
async function initBusinessRecord() {

}

/**
 * 3.初始化内建业务的菜单
 * @return {Promise} [description]
 */
async function initMenu(businessMenus) {

    let saveMenuResult = [];
    for (let menu of businessMenus) {
        let returnedResult = await saveMenu(menu, 0);
        saveMenuResult = saveMenuResult.concat(returnedResult);
    }
    return saveMenuResult;
}

// 目前的写法只能针对两级菜单
async function saveMenu(menu, menupid) {
    let saveMenuResult = [];
    let dbMenu = await Menu.saveMenu(menu.name, menu.level, menu.menu_icon, menu.uri, menupid);
    saveMenuResult.push(dbMenu);
    if (undefined !== menu.sub) {
        // 有子菜单
        for (let subMenu of menu.sub) {
            let thisSaveMenu = await Menu.saveMenu(subMenu.name, subMenu.level, subMenu.menu_icon, subMenu.uri, dbMenu._id);
            saveMenuResult.push(thisSaveMenu);
        }
    } else {
        // 没有子菜单了
    }
    return saveMenuResult;
}

/**
 * 初始化结束的方法
 * @return {[type]} [description]
 */
function initDone() {}
