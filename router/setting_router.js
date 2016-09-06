var router = require('express').Router();
var setting_controller= require('../controllers/setting');


// 页面
router.get('/',setting_controller.index);

module.exports=router;
