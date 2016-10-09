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

var initObj = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../properties/init.yaml')));

let adminUser = initObj.user_root;
let basicAccessPaths = initObj.basic_access_path;
let rootRole = initObj.role_root;

/**
 * 初始化admin用户,如果没有admin会创建出admin用户
 * @type {[type]}
 */
User.getUserByLoginName('admin', function(err, user) {
    if (err) {
        logger.info(err);
    } else {
        if (null === user) {
            // 没有admin用户
            let hmac = crypto.createHmac('sha256', global.thisapp.appConfigYaml.pass_salt);
            hmac.update(adminUser.pass);
            adminUser.pass = hmac.digest('hex');

            User.saveUser(adminUser, function(err, user) {
                if (err) {} else {
                    logger.info('amdin 用户初始化成功');
                }
            });
        } else {
            // 已存在admin用户
            logger.debug('admin 用户已经存在');
        }
    }
});

function initRootRole() {
    Role.getRoleByName('root', function(err, role) {
        if (err) {
            logger.info('root role 查询失败');
        } else {
            if (null === role) {
                Role.save(rootRole.name, rootRole.description, rootRole.parent, (err, role) => {
                    if (err) {} else {
                        logger.debug('root role 创建成功');
                    }
                });

            } else {
                logger.debug('root role 已经存在');
            }
        }
    });
}

initRootRole();

async function initAccessPath() {

    let allAccessPath = await AccessPath.getAllAccessPath();

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

// 初始化admin可以访问的path
// 暂时认为admin 所有都可以访问
async function initAdminAccessPath() {

    let adminPaths = await UserAccessPath.getUserPath('admin');
    if (null === adminPaths) {
        logger.info('admin basic access_path is null');
        logger.info('generate admin basic access_path');

        // 默认此时的access path 都是admin可以访问的
        let allAccessPath = await AccessPath.getAllAccessPath();

        let result = accessPathSort(allAccessPath);

        logger.info(result);
        UserAccessPath.save('admin', result);

        // let adminPathArr = [];
        // for (let adminPath of basicAccessPaths) {
        //     let accessPath = await AccessPath.saveAccessPath(adminPath.name, adminPath.path,
        //         adminPath.level, adminPath.id, adminPath.pid, adminPath.truth);
        //     adminPathArr.push(accessPath._id);
        // }
        // await UserAccessPath.save('admin', adminPathArr);

    } else {
        logger.info('admin access path has exist');
    }
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

// UserMenu.getUserMenu('admin', function(err, userMenu) {
//     if (err) {
//         logger.info(err);
//     } else {
//         if (null === userMenu) {
//             logger.info('admin userMenu is null');
//             UserMenu.saveUserMenu('admin', adminMenu, function(err) {
//
//             });
//         } else {
//             logger.info("admin's userMenu is not null");
//             // 点号和[]没有优先级区别
//             // logger.info(userMenu.menuObj[0].sub_menu);
//         }
//     }
// });

initAccessPath().then(v => {
    initAdminAccessPath().then(v => {
        initAdminMenu();
    });
});
