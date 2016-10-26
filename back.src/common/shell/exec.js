const childProcess = require('child_process');
const exec = childProcess.exec;
const execSync = childProcess.execSync;

/**
 * 执行命令,返回promise
 * @param  {[type]} cmd [description]
 * @return {[type]}     [description]
 */
exports.exec = function(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, {
            timeout: 10000
        }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}

exports.execSync = function(cmd) {
    let result = execSync(cmd, {timeout: 10000});
    console.log(result.toString());
    return result.toString();
}
