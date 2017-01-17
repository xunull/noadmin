const basicController = require('../controllers').basic;
const router = require("express").Router();

router.post('/saveArticle', basicController.saveArticle);
module.exports = router;
