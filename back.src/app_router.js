var express = require('express');
var home = require('./controllers/home');
var menu_router = require('./router/menu_router');
var setting_router = require('./router/setting_router');
var nosession = require('./middlewares/nosession');
var express_app = global.thisapp.express_app;

// 权限验证中间件
var permission = require('./middlewares/permission');

// 中间件添加的顺序就是中间件执行的顺序
// 先执行对权限的验证
express_app.use(permission.userRequired);

express_app.use(nosession.setSession);

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
