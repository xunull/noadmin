var express = require('express');
var path = require('path');
var _ = require('lodash');
var ejs = require('ejs');

var helmet = require('helmet');
// expreess 官方的中间件
var session = require('express-session');
var bodyParser = require('body-parser');

var RedisStore = require('connect-redis')(session);

var config = require('../config/app.config');
var logger = global.thisapp.logger;

var app = express();

// 这个报错了没有输出
app.use(session({
  secret: config.session_secret,
  store: new RedisStore({
    port: config.redis_port,
    host: config.redis_host,
    pass: config.redis_password
  }),
  resave: true,
  saveUninitialized: true,
}));
// express 官方的中间件
app.use(require('cookie-parser')(config.session_secret));

// express.static 是 express 唯一一个内置的中间件
// public 是挂载路径,是对外界生效的, 不是指本地public的意思,本地的这个public 是在上面语句中指定的
// 这个方法可以多次调用, 查找是按照添加的顺序查找
//
// 没有被打包时的路径
app.use('/public', express.static(config.directory_config.publicDir));
// 打包后的路径
app.use('/dist', express.static(config.directory_config.distDir));
// bower_components 挂载的目录
app.use('/libs',express.static(config.directory_config.otherDir));

app.use(bodyParser.json({
    limit: '1mb'
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1mb'
}));

if(config.debug) {
  // 如果是开发模式，就清除掉缓存，暂时这么认为
  ejs.clearCache();
}

// 视图目录
app.set('views', config.directory_config.view);
app.set('view engine', 'html');
app.engine('html', ejs.__express);

// 网站安全增强
app.use(helmet());

_.extend(app.locals, {
    config: config
});


// router
// app.use('/', app_router);

global.thisapp.express_app=app;

// 核心系统的router
require('./app_router');

// 加载业务逻辑
require('./business');

// socketio
var io = require('socket.io')(22111);

/**
 * 全局404
 */
app.get('*', function(req, res){
    res.status(404).send('您请求的页面没有找到');
});

/**
 * 全局错误处理
 */
app.use(function(err, req, res, next) {
  logger.error(err.stack);
  res.status(500).send('Something error!');
});

var server = app.listen(config.port, function() {
    logger.info('listening on port', config.port);
});

exports.app = app;
exports.server = server;
