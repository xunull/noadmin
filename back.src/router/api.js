var router = require('express').Router();
var controllers = require('../controllers');

var roleController = controllers.roleController;
var accesspathController = controllers.accesspathController;

// *********************角色相关api*****************************
router.get('/role/all', roleController.getAll);
router.post('/role/save', roleController.saveRole);

// *********************path管理相关api*************************
router.get('/path/tree', accesspathController.getTreeNode);
router.get('/path/tree/:pid', accesspathController.getTreeNode);

module.exports = router;
