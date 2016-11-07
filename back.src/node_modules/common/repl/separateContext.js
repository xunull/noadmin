/**
 * 独立上下文下的repl,跟主程序没有关系
 * 虽然没有享有global，但是其工程中的模块依然可以被加载的
 * 并且是互相关联的
 */
const repl = require('repl');

/**
  * repl 可以start 多个，但是input 和 output 需要分开，否则没法用了
  */

exports.start = function() {
    /**
     * 使用标准输入和标准输出
     * @type {String}
     */
    repl.start({prompt: '###'});
}
