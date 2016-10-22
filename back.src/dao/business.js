var models = require('../models');
var Business = models.Business;

/**
 * 保存一个business记录，参数采用解构形式
 * @param  {[type]} name        [description]
 * @param  {[type]} description [description]
 * @return {[type]}             [description]
 */
exports.save=function({name,description}) {
    return new Promise((resolve,reject)=>{
        let business = new Business();
        business.name = name;
        business.description = description;

        business.save((err,business)=>{
            if(err) {
                reject(err);
            } else {
                resolve(business);
            }
        });
    });
}
