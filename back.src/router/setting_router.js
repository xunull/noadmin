var router = require('express').Router();
var setting_controller= require('../controllers/setting');
var access_path_controller = require('../controllers/access_path');


router.post('/:username/accessPath',access_path_controller.getAccessPath);
router.post('/accessPath',access_path_controller.getAccessPath);
router.post('/allAccessPath',access_path_controller.getAllAccessPath);

module.exports=router;
