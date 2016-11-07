/**
 * 如果不配置，那么自己的项目中的node_modules目录也会被排除掉
 * 使用only可以指定被转换的目录，那么将所有的后台代码文件夹作为转换目录
 * 并且不用关系前端代码的转换，前端代码的转换是由webpack完成的
 * @type {[type]}
 */
require("babel-core/register")({
    only:/back.src/
});
var base_app = require('./base_app');

// 运行服务端
require('./back.src/node_modules');

require('./back.src/node_modules/ocket.io');
