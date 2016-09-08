var router = require('express').Router();
var setting_controller= require('../controllers/setting');
var access_path_controller = require('../controllers/access_path');

// 页面
router.post('/:username/getUserAccessPath',access_path_controller.getUserAccessPath);
router.post('/getAllAccessPath',access_path_controller.getAllAccessPath);

module.exports=router;
