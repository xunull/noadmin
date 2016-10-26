require("babel-core/register");

global.thisapp = {
    config: require('../config/app.config'),
    logger: require('../back.src/common/logger')
};

// 初始化
require('./initCore');
