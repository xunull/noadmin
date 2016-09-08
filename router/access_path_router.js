var router = require('express').Router();
var access_path_controller = require('../controllers/access_path');


router.post('/:username/getUserAccessPath',access_path_controller.getUserMenu);
router.post('/getAllAccessPath',getAllAccessPath);

module.exports = router;
