/**
 * 文件分析
 * 方法尽量以同步形式运行，为使书写更简洁
 * 目前全部是同步方法
 * 在其他系统中使用的时候使用fork的形式运行
 */

const fs = require('fs');
const path = require('path');
const readLine = require('readline');
const yaml = require('js-yaml');

var config = yaml.safeLoad(fs.readFileSync('config.yaml'));

var extnames = config.extnames;
var excludeExtnames = config.excludeExtnames;
var excludeDirs = config.excludeDirs;
var excludeFiles = config.excludeFiles;

module.exports = analysis;

/**
 * 分析一个文件夹下 文件的数量，文件的行数
 *
 * @param  {[type]}  dirname [description]
 * @return {Boolean}         [description]
 */
function analysis(dirname) {
    let dirCount = 0;
    let fileCount = 0;

    // 记录文件系统结构的数组
    // 对于排除的目录和文件没有记录
    let fileTreeResult = [];

    /**
     * map key为文件扩展名，value 为计数
     * @type {Map}
     */
    let extnameCountMap = new Map();
    // 初始化map
    extnames.forEach((value) => {
        extnameCountMap.set(value, 0);
    });

    function recordAFileNum(filename) {
        let extname = path.extname(filename);
        let fileNum = obtainEndLine(filename);
        extnameCountMap.set(extname, extnameCountMap.get(extname) + fileNum);

    }

    function obtain(dirname, fileTree) {
        try {
            let files = fs.readdirSync(dirname);
            for (let file of files) {

                let filePath = path.join(dirname, file);
                let stats = fs.statSync(filePath);

                if (stats.isFile()) {

                    if (checkExtname(file)) {
                        fileTree.push(file);
                        fileCount++;
                        recordAFileNum(filePath);

                    }

                } else if (stats.isDirectory()) {

                    if (file.startsWith('.')) {
                        // 以.开头的暂时全部排除
                    } else if (excludeDirs.includes(file)) {
                        // 在黑名单中放行白名单

                    } else {
                        dirCount++;

                        let childTree = [];
                        fileTree.push({file: childTree});
                        obtain(filePath, childTree);
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }

    }

    obtain(dirname, fileTreeResult);

    return {dirCount, fileCount, extnameCountMap, fileTreeResult}

}

/**
 * 目前只判断白名单就行了
 * 白名单效力大于黑名单
 * @param  {[type]} filename [description]
 * @return {[type]}          [description]
 */
function checkExtname(filename) {
    var extname = path.extname(filename);
    if (extname !== '' && extnames.includes(extname)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 这种读取方式应该是不太好
 * @param  {[type]} filename [description]
 * @return {[type]}          [description]
 */
function obtainEndLine(filename) {
    let data = fs.readFileSync(filename);
    data = data.toString();
    var startIndex = 0;

    let result = 0;

    let nCount = 0;
    for (;;) {
        result = data.indexOf('\n', startIndex)
        if (result > 0) {
            nCount++;
            startIndex = result + 1;
        } else {
            break;
        }
    }

    let rCount = 0;
    for (;;) {
        result = data.indexOf('\r', startIndex)
        if (result > 0) {
            rCount++;
            startIndex = result + 1;
        } else {
            break;
        }
    }

    let rnCount = 0;
    for (;;) {
        result = data.indexOf('\r\n', startIndex)
        if (result > 0) {
            rnCount++;
            startIndex = result + 1;
        } else {
            break;
        }
    }
    return nCount + rCount - rnCount*2;

}

/**
 * 获取一个文件的行数
 * @return {[type]} [description]
 */
function obtainFileNum(filename) {

    let rl = readLine.createInterface({input: fs.createReadStream(filename)});
    return new Promise((resolve, reject) => {
        let count = 0;
        rl.on('line', (line) => {
            count++;
        });

        rl.on('close', function() {
            resolve(count);
        });
        
    });
}
