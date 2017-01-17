const adminRouter = require('express').Router();
var businessManage = require('./businessManage');
var home = require('../controllers/home');
exports.apiRouter = require('./api');
adminRouter.use(function(req,res,next){
    console.log('adminRouter 的use');
    next();
});

adminRouter.use('/manage/business',businessManage);

exports.adminRouter =adminRouter;


// 默认router
var defaultRouter = require('express').Router();

//****************************主页*************************************
defaultRouter.get('/', home.index);
//************************* 登陆登出 ***********************************
// view
defaultRouter.get('/signin', home.signin);
defaultRouter.get('/signup', home.signup);
defaultRouter.get('/login', home.signin); // login 等同于 signin
// request
defaultRouter.post('/signin', home.userSignin);
defaultRouter.post('/signup', home.userSignup);

exports.defaultRouter = defaultRouter;
