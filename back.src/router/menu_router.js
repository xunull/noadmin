var router = require('express').Router();
var menu_controller = require('../controllers/menu');

// 设置menu页面
router.get('/',menu_controller.menuPage);
router.post('/:username/getUserMenu',menu_controller.getUserMenu);
router.post('/:username/addMenu',menu_controller.addMenu);
router.post('/:username/setUserMenu',menu_controller.setUserMenu);
router.post('/:username/deleteUserMenu',menu_controller.deleteUserMenu);
router.post('/:username/deleteMenu',menu_controller.deleteMenu);

module.exports = router;
