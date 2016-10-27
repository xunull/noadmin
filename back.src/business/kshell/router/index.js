/**
 * router的注入，是每个项目自己注入
 * 还是mian server 注入每个项目的router
 *
 * 项目本身不可以自动注入，因为这可能会冲突，更有可能会覆盖掉系统本身的router
 * 项目自身向外暴露router文件,由main server 负责挂载router
 */
const router = require('express').Router();
const basicController = require('../controllers').basic;
router.post('/login', basicController.login);

module.exports = router;
