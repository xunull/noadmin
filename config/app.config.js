var config = {
    hostname:'127.0.0.1',
    debug: true,
    port: 5000,
    mongodb: 'mongodb://127.0.0.1/noadmin',
    session_secret: 'lafdjslx-sdfjxsfsd-xs',
    redis_host: '127.0.0.1',
    redis_port: 12312,
    redis_password:123456,
    permission:false,//是否启用权限验证
};

module.exports = config;
