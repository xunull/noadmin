var router = require('express').Router();
var menu_controller = require('../controllers/menu');

// 设置menu页面
router.get('/menu',menu_controller.menuPage);
router.post('/menu/')

module.exports = router;
