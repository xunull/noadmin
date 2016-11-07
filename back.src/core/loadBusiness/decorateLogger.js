const path = require('path');
// 系统默认的logger
const logger = thisapp.logger;
// 用户创建各个业务的Logger 构造器
const winstonLogger = require('../../common').logger.winstonLogger;
// 系统默认所有log文件存储的位置
const defaultLogFileDir = thisapp.config.logFileDir;

/**
 * 这个就是系统默认给business生成的logger
 * 如果应用想要自己实现logger，那么这个部分不属于应用的可配置项
 * logger的显示完全由业务自己处理
 *
 * level的等级，这个东西可以实现成业务可以配置的，但是也可以是在业务中，业务是可以自己修改的
 * 目前先实现成一个默认的
 * @return {[type]} [description]
 */
function generateBusinessLogger(businessName) {
    console.log('这个方法运行了');
    let businessLogger = new(winstonLogger)({
        level: config.logger.level,
        // colors:colors, 对于内置的这些logger 颜色设置不起作用
        transports: [
            // 系统默认的log 只提供文件log方式
            // new(winston.transports.Console)({}),
            new(winston.transports.File)({
                name: 'log-file',
                filename: path.resolve(defaultLogFileDir, 'business', businessName, thisapp.config.logger.logFileName)
            }),
            new(winston.transports.File)({
                name: 'error-file',
                level: 'error',
                filename: path.resolve(defaultLogFileDir, 'business', businessName, thisapp.config.logger.errorFileName)
            })
        ]
    });
    return businessLogger;
}

/**
 * 替换业务中的logger对象
 * @param  {[type]} businessIndex [description]
 * @return {[type]}               [description]
 */
function decorateLogger(businessIndex,businessName) {
    businessObj.setLogger(generateBusinessLogger(businessName));
    return businessObj;
}

module.exports = decorateLogger;
