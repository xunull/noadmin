const path = require('path');
const common = require('./common');
const config = global.thisapp.config;
const logger = global.thisapp.logger;
// 非内建业务的目录地址
const otherBusinessPath = config.otherBusinessPath;

(async function() {
    try {
        // 加载内建业务
        requireManifest(path.resolve(__dirname, 'business'));
        // 加载添加的业务
        requireManifest(otherBusinessPath);
    } catch (err) {
        logger.error(err);
    }
})();

/**
 * 加载关键文件
 * @return {Promise} [description]
 */
async function requireManifest(businessRoot) {
    let hasIndexDir = await findFile(businessRoot, 'index.js');

    for (let indexDir of hasIndexDir) {
        // 加载内建业务逻辑
        try {
            require(path.resolve(indexDir, 'index.js'));
        } catch (err) {
            logger.error(err);
        }
    }

    /**
     * 查找router 文件夹的说明
     * 如果目录下有个router.js 文件和一个router文件夹
     * 那么 该router.js 使用require('./router') 是引用不到文件夹的
     *
     * 但一般来说，存在router文件夹可能是常见的，业务稍微复杂一些的 router可能就会很多
     * 因此router存在，又保证书写文件夹名的合理
     * 因此保留使用router文件夹的方式，不使用router.js
     * 因此业务目录下的router 都必须以一个router文件夹的方式引入
     *
     * 当然了 也可以指定require('xxx/index.js') 加上后缀也是可以的
     */

    let hasRouterDir = await findFile(businessRoot, 'router');

    for (let routerDir of hasRouterDir) {
        try {

            let businessName = await common.path.findLastDirName(routerDir);
            let router = require(path.resolve(routerDir, 'router'));
            mountRouter(businessName, router);
        } catch (err) {
            logger.error(err);
        }
    }
}

/**
 * 挂载一个路由
 * 目前是直接挂载在跟目录上了
 * @param  {[type]} path   [description]
 * @param  {[type]} router [description]
 * @return {[type]}        [description]
 */
function mountRouter(path, router) {
    global.thisapp.express_app.use('/' + path, router);
}

/**
 * 查找业务目录下的index,router 这些文件
 * 返回的是存在这些文件的目录
 * @param  {[type]}  dirname [description]
 * @return {Promise}         [description]
 */
async function findFile(dirname, file) {
    return common.file.findDirHasSome(dirname, file);
}
