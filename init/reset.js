/**
 * 重新初始化系统
 */
var mongoose = require('../back.src/node_modules/common/mongoose');
var models = require('../back.src/node_modules/models');
var logger = global.thisapp.logger;

/**
 * 删除掉原来的collections
 * 现在是全删了,应该有个初始的列表
 * @type {[type]}
 */
let collections = Object.keys(mongoose.db.collections);
collections.forEach(name => {
    mongoose.db.collections[name].drop();

    // mongoose.connection.db.dropCollection(name, (err, result) => {
    //     if (err) {
    //         console.log(name, ' 集合删除失败');
    //     } else {
    //         console.log(name, ' 集合删除成功');
    //     }
    //
    // });
});
require('./initCore');
// 有的是在异步执行,在这里不能关闭
// mongoose.db.close();
