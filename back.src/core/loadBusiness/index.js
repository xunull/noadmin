const path = require('path');
const common = require('../../common');
const config = global.thisapp.config;
const logger = global.thisapp.logger;
// 非内建业务的目录地址
const otherBusinessPath = config.otherBusinessPath;

const decorateLogger = require('./decorateLogger');

(async function() {
    try {
        // 加载内建业务
        requireManifest(path.resolve(__dirname, '../../business'));
        // 加载添加的业务
        requireManifest(otherBusinessPath);
    } catch (err) {
        logger.error(err);
    }
})();

/**
 * 加载关键文件，这个现在就是加载的index
 * 其实还应该加载package.json
 * @return {Promise} [description]
 */
async function requireManifest(businessRoot) {
    /**
     * 寻找index.js文件
     * @type {Boolean}
     */
    let hasIndexDir = await findFile(businessRoot, 'index.js').catch((err)=>{
        logger.error(err);
        // 如果寻找文件的操作出错，那么就直接返回吧
        // 但是这个地方如果直接返回也是有问题的，错误也许会是因为某个业务逻辑的地方发生了错误
        // 但是还是有正确的地方的，这种情况是全都不加载，还是加载那些没有问题的，同时放弃了那些错误的
        // 这个问题可能在处理其他的地方的时候也会遇到
        return;
    });

    /**
     * 寻找package.json文件
     * @type {Boolean}
     */
    let hasPackageDir = await findFile(businessRoot,'package.json').catch((err)=>{
        logger.error(err);
        return;
    });

    for (let indexDir of hasIndexDir) {
        // 加载内建业务逻辑
        try {
            let businessIndex = require(path.resolve(indexDir, 'index.js'));
            let indexModuleType = typeof businessIndex;

            if('object' === indexModuleType) {
                //  如果是对象暂且不处理
                //  一些业务逻辑在加载的过程中可能就被创建了
            } else if('function' === indexModuleType) {
                // 如果模块仅仅是一个方法
                // 首先约定为业务逻辑目录中的index文件，如果导出的仅仅是一个方法
                // 那么认为其是一个继承于business对象的类，也就是一个创建对象的function

                // 获取业务名称
                let tempArr = businessIndex.split('/');
                let businessName = tempArr[tempArr.length-2];
                let businessObj = new businessIndex();
                console.log('这个方法真的运行了');
                decorateLogger(businessObj,businessName);
            }
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
