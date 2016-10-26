/**
 * 重新初始化系统
 */
var mongoose = require('../back.src/common/mongoose');
var models = require('../back.src/models');
var logger = global.thisapp.logger;

/**
 * 删除掉原来的collections
 * @type {[type]}
 */
let collections = Object.keys(mongoose.db.collections);
collections.forEach(name => {
    mongoose.db.collections[name].drop();
});
require('./initCore');
// 有的是在异步执行,在这里不能关闭
// mongoose.db.close();
