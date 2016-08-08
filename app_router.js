var express = require('express');

// controllers
var home = require('./controllers/home');

var router = express.Router();

router.get('/', home.index);
router.get('/signin',home.signin);
router.get('/signup',home.signup);

router.post('/signin',home.userSignin);
router.post('/signup',home.userSignup);

module.exports = router;
