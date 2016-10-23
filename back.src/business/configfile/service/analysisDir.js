/**
 * 分析用户目录
 */

var common = global.thisapp.common;

var userHome = common.nodeOs.homedir;

async function findHidden() {
    let hiddenFile = await common.file.findHiddenFile(userHome);
    let hiddenDir = await common.file.findHiddenDir(userHome);
    // 对象增强，这种写返回值的方式有点像python的多返回了
    global.thisapp.hidden = {
        hiddenFile,
        hiddenDir
    }
    return {hiddenFile, hiddenDir};
};

(async function() {
    try {
        await findHidden();
    } catch (err) {
        console.log(err);
    }

})();
