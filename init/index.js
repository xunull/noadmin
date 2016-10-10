var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var logger = global.thisapp.logger;
var uuid = require('node-uuid');

var basicDao = require('../back.src/dao');

var User = basicDao.User;
var UserMenu = basicDao.UserMenu;
var AccessPath = basicDao.AccessPath;
var UserAccessPath = basicDao.UserAccessPath;
var Role = basicDao.Role;
var UserRole = basicDao.UserRole;
var RoleAccessPath = basicDao.RoleAccessPath;

var initObj = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../properties/init.yaml')));

let adminUser = initObj.user_root;
let basicAccessPaths = initObj.basic_access_path;
let rootRole_yaml = initObj.role_root;

/**
 * init 主方法
 */
(async function init() {
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
    let hmac = crypto.createHmac('sha256', global.thisapp.appConfigYaml.pass_salt);
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
            for (let tempAccessPath of basicAccessPaths) {
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
        } else {
            dimension.push(id);
        }
        tempAccessPath.id = id;
        tempAccessPath.dimension = dimension;
        let accessPath = await AccessPath.saveAccessPath(tempAccessPath.name, tempAccessPath.uri, tempAccessPath.level, tempAccessPath.id, tempAccessPath.dimension, tempAccessPath.node);
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

// 初始化用户的菜单
async function initAdminMenu() {
    try {
        let amdinMenu = await UserMenu.getUserMenu('admin');
        if (null === amdinMenu) {
            logger.info('admin menu is not exist');
            logger.info('generate admin menu');
        } else {
            logger.info('amdin menu has exist');
        }
    } catch (err) {
        logger.error(err);
    }
}
