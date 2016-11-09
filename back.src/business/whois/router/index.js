const router = require('express').Router();
const basicController = require('../controllers').basic;


router.use(function timeLog(req, res, next) {
  console.log('这里是whois 的use ');
  next();
});

router.get('/getwhois',basicController.getwhois);

module.exports = router;
