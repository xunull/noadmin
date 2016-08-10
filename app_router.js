var express = require('express');
var home = require('./controllers/home');
var menu_router = require('./router/menu_router');
var express_app = global.thisapp.express_app;
// controllers

// 默认router
var default_router = express.Router();

express_app.use('/',default_router);

default_router.get('/', home.index);
default_router.get('/signin',home.signin);
default_router.get('/signup',home.signup);

default_router.post('/signin',home.userSignin);
default_router.post('/signup',home.userSignup);

// 有关菜单操作的路由
express_app.use('/menu',menu_router);
