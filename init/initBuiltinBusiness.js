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
const yaml = global.thisapp.common.yaml;

(async function init() {
    try {

        var initObj = await yaml.safeLoadFile(initBusinessYamlPath);
        if (undefined === initObj.initOver) {
            logger.info('built in business has not init');
            let businessMenu = initObj.business_menu;
            await initMenu();
            initObj.initOver = true;
            yaml.safeDumpFile(initObj, initYamlPath);
        } else {
            logger.info('内建业务逻辑已经初始化过');
        }

    } catch (err) {
        logger.error(err);
    }
})();

async function initMenu() {}

/**
 * 初始化结束的方法
 * @return {[type]} [description]
 */
function initDone() {}
