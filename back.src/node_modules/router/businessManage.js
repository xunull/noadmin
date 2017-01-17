const router = require('express').Router();
const businessManage = require('../controllers').businessManage;

router.get('/getLoaded',businessManage.getLoaded);

module.exports = router;
