var childProcess = require('child_process');
var execFile = childProcess.execFile;

exports.execFile = function(file, args) {
    return new Promise((resolve, reject) => {
        execFile(file, args, {
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
