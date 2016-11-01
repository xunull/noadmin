const router = require('express').Router();
const basicController = require('../controllers').basic;

router.post('/start',basicController.start);

module.exports = router;
