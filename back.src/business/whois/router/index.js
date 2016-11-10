const router = require('express').Router();
const basicController = require('../controllers').basic;


router.use(function timeLog(req, res, next) {
  next();
});

router.get('/getwhois',basicController.getwhois);
router.get('/getWhoisAllServer',basicController.getWhoisAllServer);

module.exports = router;
