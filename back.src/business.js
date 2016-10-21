const path = require('path');
const common = require('./common');
const config = global.thisapp.config;
// 非内建业务的目录地址
const otherBusinessPath = config.otherBusinessPath;

(async function() {
    let businessIndexPath = await common.file.findDirIndex(path.resolve(__dirname, 'business'));
    for (let indexPath of businessIndexPath) {
        // 加载内建业务逻辑
        require(indexPath);
    }
    let otherBusinessIndexPath = await common.file.findDirIndex(otherBusinessPath);
    for (let indexPath of otherBusinessIndexPath) {
        // 加载使用者业务逻辑
        require(indexPath);
    }
})();
