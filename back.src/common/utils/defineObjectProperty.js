/**
 * 定义对象的属性
 */

/**
 * 加固一个对象，使其成员变量不可以被修改
 * 因为js对象的属性可以随意修改，为了防止对象在使用期间被改变,需要加固属性
 * 即使是class new 出来的对象，其属性也是可以被修改的
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
exports.reinforceObject = function(obj) {

    let keys = Object.getOwnPropertyNames(obj);
    for (let key of keys) {
        Object.defineProperty(obj, key, {
            value: obj[key],
            enumerable: true,
            configurable: false,
            writable: false
        })
    }
}

/**
 * 加固对象的某个指定属性名
 * @param  {[type]} obj          [description]
 * @param  {[type]} propertyName [description]
 * @return {[type]}              [description]
 */
exports.reinforceObjectOneObject = function(obj, propertyName) {
    Object.defineProperty(obj, propertyName, {
        vlaue: obj[propertyName],
        enumerable: true,
        configurable: false,
        writable: false
    })
}
