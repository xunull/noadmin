var express = require('express');
var home = require('./controllers/home');
var menu_router = require('./router/menu_router');
var setting_router = require('./router/setting_router');

var middlewares = require('./middlewares');
var express_app = global.thisapp.express_app;
var config = global.thisapp.config;

// 中间件添加的顺序就是中间件执行的顺序

// nosession
express_app.use(middlewares.nosession.setSession);
// 权限验证中间件
// 先执行对权限的验证
express_app.use(middlewares.permission.userRequired);


express_app.use(middlewares.menu.generateUserMenu);

// 解析debug 参数
if(config.debug) {
    express_app.use(middlewares.debug.parse);
}

// 默认router
var default_router = express.Router();
express_app.use('/',default_router);

default_router.get('/', home.index);
default_router.get('/signin',home.signin);
default_router.get('/signup',home.signup);
// login 等同于 signin
default_router.get('/login',home.signin);
default_router.post('/signin',home.userSignin);
default_router.post('/signup',home.userSignup);

// 有关菜单操作的路由
express_app.use('/menu',menu_router);
// 设置项相关的路由
express_app.use('/setting',setting_router);
