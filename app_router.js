var express = require('express');

// controllers
var home = require('./controllers/home');

var router = express.Router();

router.get('/', home.index);

router.get('/productSearch',home.productSearch);

module.exports = router;
