var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var logger = require('../back.src/common/logger');
var config = require('../config/app.config');
var uuid = require('node-uuid');
const yaml = require('../back.src/common/utils/yaml');
var basicDao = require('../back.src/dao');

var User = basicDao.User;
var Menu = basicDao.Menu;
var UserMenu = basicDao.UserMenu;
var AccessPath = basicDao.AccessPath;
var UserAccessPath = basicDao.UserAccessPath;
var Role = basicDao.Role;
var UserRole = basicDao.UserRole;
var RoleAccessPath = basicDao.RoleAccessPath;
var RoleMenu = basicDao.RoleMenu;

let initYamlPath = config.init.initYamlPath;
var appConfigYaml = require('js-yaml').safeLoad(fs.readFileSync(config.appConfigYaml));
var initObj = require('js-yaml').safeLoad(fs.readFileSync(initYamlPath));

let basicMenu = initObj.basic_menu;
let adminUser = initObj.user_root;
let basicAccessPaths_yaml = initObj.basic_access_path;
let rootRole_yaml = initObj.role_root;

/**
 * init 主方法
 * 如果利用上个结果的返回值，那么这些方法都能真正的运行的时候
 * 才能保证后面的方法也能真正的运行
 */
(async function init() {
    try {
        if (undefined === initObj.initOver) {
            logger.info('开始初始化');
            // 1.初始化admin用户
            let user = await initAdminUser();
            // 2.初始化root role
            let rootRole = await initRootRole();
            // 3.初始化root role access path
            let rootRoleAccessPath = await initRootRoleAccessPath(rootRole);
            // 4.初始化admin用户 角色为root
            let adminUserRole = await initAdminUserRole(user, rootRole);
            // 5.初始化access path
            await initAccessPath();
            // 6.初始化菜单
            let saveMenuResult = await initMenu();
            // 7.初始化admin菜单
            await initAdminMenu();
            // 8.init root role menu
            await initRootRoleMenu(rootRole._id, saveMenuResult);

            // initObj.initOver = true;
            // yaml.safeDumpFile(initObj, initYamlPath);
        } else {
            // 已经初始化一次了
            logger.info('核心内容已经初始化过');
        }

        if (config.initBuiltinBusiness) {
            require('./initBuiltinBusiness');
        }

    } catch (err) {
        logger.info(err);
    }

})();

/**
 * 1.初始化admin 用户
 * @return {Promise} [description]
 */
async function initAdminUser() {
    let user = await User.getUserByLoginName('admin');
    if (null !== user) {
        logger.debug('admin 用户已经存在');
        return user;
    }

    let hmac = crypto.createHmac('sha256', appConfigYaml.pass_salt);
    // pass 必须是string 或者 buffer 数字是不可以的
    hmac.update(adminUser.pass);
    adminUser.pass = hmac.digest('hex');
    user = await User.saveUser(adminUser);
    logger.info('amdin 用户初始化成功');
    return user;
}

/**
 * 2.初始化root role
 * @return {Promise} [description]
 */
async function initRootRole() {
    try {
        let resultRole = await Role.getRoleByName('root');
        if (null !== resultRole) {
            // root role 已经存在
            logger.info('root role 已经存在');
            return resultRole;
        }
        resultRole = await Role.save(rootRole_yaml.name, rootRole_yaml.description, rootRole_yaml.parent);

        return resultRole;
    } catch (err) {
        logger.error(err);
    }
}

/**
 * 3.初始化root role access path
 * 其实这些方法，如果被调用 肯定是 系统没有被初始化，那么一切方法必然是需要运行的
 * 但现在在每个方法中都进行了预查询，也是为了提高程序的准确性
 * @return {Promise} [description]
 */
async function initRootRoleAccessPath(rootRole) {
    try {
        let rootRoleAccessPath = await RoleAccessPath.getAccessPathByRoleid(rootRole._id);
        if (null !== rootRoleAccessPath) {
            return rootRoleAccessPath;
        }
        rootRoleAccessPath = await RoleAccessPath.save(rootRole._id, [0], []);
        return rootRoleAccessPath;
    } catch (err) {
        logger.error(err);
    }

}

/**
 * 4.初始化admin用户 角色为root
 * @return {Promise} [description]
 */
async function initAdminUserRole(user, rootRole) {
    let userRole = await UserRole.getUserRoleByUserName('admin');
    if (null !== userRole) {
        logger.info('amdin user role has exist');
        return userRole;
    }
    userRole = await UserRole.save(user._id, [rootRole._id]);
    return userRole;
}

/**
 * 5.初始化access path
 * @return {Promise} [description]
 */
async function initAccessPath() {

    let allAccessPath = await AccessPath.getAllAccessPath();

    try {
        if (0 === allAccessPath.length) {
            logger.info('admin basic access_path is null');
            logger.info('generate admin basic access_path');
            for (let tempAccessPath of basicAccessPaths_yaml) {
                generate(tempAccessPath);
            }
        } else {
            // 已经有access path了
            logger.info('basic access path has exist');
        }

    } catch (err) {
        console.log(err);
    }

    async function generate(tempAccessPath, parentDimension) {
        let dimension = parentDimension;
        let id = uuid.v4();
        if (undefined === parentDimension) {
            // 0 是最上层的根节点
            dimension = [0, id];
            tempAccessPath.pid = 0;
        } else {
            tempAccessPath.pid = parentDimension[parentDimension.length - 1];
            dimension.push(id);
        }
        tempAccessPath.id = id;
        tempAccessPath.dimension = dimension;
        let accessPath = await AccessPath.saveAccessPath(tempAccessPath.name, tempAccessPath.uri, tempAccessPath.level, tempAccessPath.id, tempAccessPath.pid, tempAccessPath.dimension);
        if (undefined !== tempAccessPath.sub) {
            // 有下层链接
            for (let subAccessPath of tempAccessPath.sub) {
                // 复制一个数组，否则这个for 循环内的都是相同的dimension
                let tempDimension = dimension.concat();
                generate(subAccessPath, tempDimension);
            }
        } else {
            // 此节点下没有子节点
        }
    }

}

/**
 * 6.初始化菜单
 * @return {Promise} [description]
 */
async function initMenu() {

    // 只好先读取一下admin的菜单了,如果没有admin的菜单，就还没有初始化过
    let adminMenu = await UserMenu.getUserMenu('admin');
    if (null !== adminMenu) {
        // admin 的menu 都有了，那么可能菜单都已经设置过了
        return;
    }
    let saveMenuResult = [];
    for (let menu of basicMenu) {
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
 * 7.初始化admin 的菜单
 * @return {Promise} [description]
 */
async function initAdminMenu() {
    let adminMenu = await UserMenu.getUserMenu('admin');
    if (null !== adminMenu) {
        // admin 的menu 都有了，那么可能菜单都已经设置过了
        return;
    }
    let allMenus = await Menu.findAllMenu();
    let menuids = [];
    for (let menu of allMenus) {
        menuids.push(menu._id);
    }
    await UserMenu.saveUserMenu('admin', menuids);
}

/**
 * 8.init root role menu
 * @return {Promise} [description]
 */
async function initRootRoleMenu(rootRoleId, menus) {

    if (menus.length > 0) {
        try {
            let rootRoleMenu = await RoleMenu.findMenu(rootRoleId);
            if (null !== rootRoleMenu) {
                return rootRoleMenu;
            }
            let menuids = [];
            for (let menu of menus) {
                menuids.push(menu._id);
            }
            let saveResult = await RoleMenu.saveMenu(rootRoleId, menuids);
            return saveResult;
        } catch (err) {
            logger.error(err);
        }
    } else {
        return null;
    }

}

/**
 * accessPath 排序
 * @param  {[type]} allAccessPath [该参数为从数据库中查询出来的access path]
 * @return {[type]}               [description]
 */
function accessPathSort(allAccessPath) {
    let pathSortByLevel = [];
    for (let tempAccessPath of allAccessPath) {
        if (undefined === pathSortByLevel[tempAccessPath.level]) {
            pathSortByLevel[tempAccessPath.level] = [];
        }
        pathSortByLevel[tempAccessPath.level].push(tempAccessPath);
    }
    let pathSortMap = new Map();
    pathSortMap.set('name', 'root');
    pathSortMap.set('children', new Map());
    for (let tempAccessPath of pathSortByLevel[0]) {
        let tempMap = new Map();
        tempMap.set('name', tempAccessPath.name);
        tempMap.set('id', tempAccessPath.id);
        tempMap.set('children', new Map());
        pathSortMap.get('children').set(tempAccessPath.id, tempMap);
        generateMap(tempMap, 1, tempAccessPath.id);
    }

    function generateMap(parentMap, level, parentId) {
        if (undefined === pathSortByLevel[level]) {
            // 已经不存在这个级别了
        } else {
            for (let tempAccessPath of pathSortByLevel[level]) {
                if (parentId === tempAccessPath.dimension[level - 1]) {
                    let tempMap = new Map();
                    tempMap.set('name', tempAccessPath.name);
                    tempMap.set('id', tempAccessPath.id);
                    tempMap.set('children', new Map());
                    parentMap.get('children').set(tempAccessPath.id, tempMap);
                    generateMap(tempMap.get('children'), level + 1, parentId);
                } else {}
            }
        }
    }
    return pathSortMap;

}
