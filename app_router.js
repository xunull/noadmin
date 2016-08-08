var express = require('express');

// controllers
var home = require('./controllers/home');

var router = express.Router();

router.get('/', home.index);
router.get('/login',home.login);


module.exports = router;
