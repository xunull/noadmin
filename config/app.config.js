var path = require('path');
var config = {
    hostname: '127.0.0.1',
    debug: true,
    port: 5000,
    mongodb: 'mongodb://127.0.0.1/noadmin',
    session_secret: 'lafdjslx-sdfjxsfsd-xs',
    redis_host: '127.0.0.1',
    redis_port: 12312,
    redis_password: 123456,
    permission: false, //是否启用权限验证
    directory_config: {
        view: path.resolve(__dirname, '..', 'front.src/views'),
        publicDir: path.resolve(__dirname, '..', 'front.src/public'),
        otherDir: path.resolve(__dirname, '../bower_components'),
        distDir: path.resolve(__dirname, '../dist')
    },
    otherBusinessPath: path.resolve(__dirname, '../business'),
    initBuiltinBusiness: true,
    // 初始化相关的配置
    init: {
        initYamlPath: path.resolve(__dirname, '../properties/init.yaml'),
        initBusinessYamlPath: path.resolve(__dirname, '../properties/business-init.yaml')
    },
    logFileDir:path.resolve(__dirname,'../logs'),
    logger: {
        logFileName: 'log.log',
        errorFileName: 'error.log',
        level: 'debug'
    },
    appConfigYaml: path.join(__dirname, '../properties/app_config.yaml'),
    // 业务产生的数据的存放目录
    businessDataFolder:path.resolve(__dirname,'../data')

};

module.exports = config;
