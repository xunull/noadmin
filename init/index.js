require("babel-core/register");
global.thisapp = {
    config: require('../config/app.config'),
    logger: require('../back.src/common/logger')
};

const initArg = process.argv[2];

switch (initArg) {
    case undefined:
        // 初始化
        require('./initCore');
        break;
    case 'reset':
        require('./reset');
        break;
    default:
        console.log('请给出合法的初始化参数');
}
