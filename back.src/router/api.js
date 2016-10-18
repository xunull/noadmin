var router = require('express').Router();
var controllers = require('../controllers');

var roleController = controllers.roleController;

// *********************角色相关api*****************************
router.get('/role/all', roleController.getAll);
router.post('/role/save',roleController.saveRole);

module.exports = router;
