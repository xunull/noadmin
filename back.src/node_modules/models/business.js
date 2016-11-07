/**
 * 对业务进行区分是为了对资源的整合
 * 也是对某个领域的归纳
 * @type {[type]}
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _ = require('lodash');

var BasicProperty = require('./basic_property');

var Business = new Schema(_.assign({
    name:String,
    description:String,
},BasicProperty));


mongoose.model('Business',Business);

exports.schema=Business;
