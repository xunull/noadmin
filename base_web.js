var express = require('express');
var path = require('path');
var _ = require('lodash');


var helmet = require('helmet');
// expreess 官方的中间件
var session = require('express-session');
var bodyParser = require('body-parser');

var RedisStore = require('connect-redis')(session);

var config = require('./config');
var logger = require('./common/logger');
var app_router = require('./app_router');
var permission = require('./middlewares/permission');

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

// 本系统的资源
var publicDir = path.join(__dirname, 'public');
// 第三方的资源
var staticDir = path.join(__dirname, 'bower_components');
// 打包后的文件目录
var distDir = path.join(__dirname, 'dist');

// express.static 是 express 唯一一个内置的中间件
// public 是挂载路径,是对外界生效的, 不是指本地public的意思,本地的这个public 是在上面语句中指定的
// 这个方法可以多次调用, 查找是按照添加的顺序查找
app.use('/public', express.static(publicDir));
// 有些资源需要打包后使用
app.use('/dist', express.static(distDir));

app.use('/libs',express.static(staticDir));

app.use(bodyParser.json({
    limit: '1mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1mb'
}));

// 视图目录
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// 网站安全增强
app.use(helmet());

_.extend(app.locals, {
    config: config
});

// 中间件添加的顺序就是中间件执行的顺序

// app.use(permission.userRequired);
// router
app.use('/', app_router);

app.use(function(err, req, res, next) {
  logger.error(err.stack);
  res.status(500).send('Something error!');
});

var server = app.listen(config.port, function() {
    logger.info('listening on port', config.port);
    logger.info('You can debug your app with http://' + config.hostname + ':' + config.port);
});

exports.app = app;
exports.server = server;
