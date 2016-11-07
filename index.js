require("babel-core/register");
var base_app = require('./base_app');

// 运行服务端
require('./back.src');

require('./back.src/socket.io');
