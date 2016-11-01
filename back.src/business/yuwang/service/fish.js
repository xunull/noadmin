/**
 * 爬虫
 *
 */
// fork的对象 global是不通用的
// const logger = global.thisapp.logger;

const common = require('../../../common');
const logger = common.logger;
global.thisapp = {
    common: common,
    logger: logger
}
const handler = require('./handler');

console.log('我是runner');
logger.info('创建一条fish');

process.on('message', (m) => {
    handle(m);
    console.log('CHILD got message:', m);
});

function handle(msg) {
    if (undefined === handler[msg.cmd]) {
        process.send({ok: false, msg: '请求命令未定义'});
    } else {
        let result = handler[msg.cmd](msg);
        process.send(result);
    }
}
