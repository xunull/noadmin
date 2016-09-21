var path = require('path');
var config = {
    hostname:'127.0.0.1',
    debug: true,
    port: 5000,
    mongodb: 'mongodb://127.0.0.1/noadmin',
    session_secret: 'lafdjslx-sdfjxsfsd-xs',
    redis_host: '127.0.0.1',
    redis_port: 12312,
    redis_password:123456,
    permission:true,//是否启用权限验证
    directory_config:{
      view:path.resolve(__dirname,'..','front.src/views'),
      publicDir:path.resolve(__dirname,'..','front.src/public'),
      otherDir:path.resolve(__dirname,'../bower_components'),
      distDir:path.resolve(__dirname,'../dist')
    },
    logFile:path.resolve(__dirname,'../logs/log.log')
};

module.exports = config;
