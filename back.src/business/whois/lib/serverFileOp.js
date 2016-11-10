/**
 * 对whois server file 的操作
 *
 * yaml file 里面存储的就是 key value 的形式
 */

const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

var yamlFilePath = path.resolve(__dirname,'./whoisServer.yaml');

/**
 * 初始化，读取，转化
 * 前端像使用的时候，每次都Object.keys 可能性能不太好
 * @return {[type]} [description]
 */
function init() {
    var serverYaml = yaml.safeLoad(fs.readFileSync(yamlFilePath));
    // map的构造方法没法调用，super() 之后并没有
    class TempMap extends Map {
        set(key, value) {
            serverYaml.key = value;
            super.set(key, value);
        }
        // 保存配置
        save(){
            let fileData = yaml.safeDump(serverYaml);
            fs.writeFileSync('./whoisServer.yaml', fileData);
        }
    }

    var serverMap = new TempMap();
    // let keys = Object.keys(serverYaml);
    for (let key in serverYaml) {
        serverMap.set(key, serverYaml[key]);
    }
    return {serverYaml, serverMap}
}

var {serverYaml, serverMap} = init();

exports.serverMap = serverMap;
// 其实前端需要的就是一个对象，并不是一个map
exports.serverYaml = serverYaml;
exports.dump = dump;

function dump() {
    let fileData = yaml.safeDump(serverYaml);
    fs.writeFileSync(yamlFilePath, fileData);
}
