/**
 * 记录具有的基本属性
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _ = require('lodash');

var OperateRecord = require('./operate_record');

var BasicProperty = _.assign({
    can_delete: Boolean,
    is_deleted: Boolean
}, OperateRecord);

module.exports = BasicProperty;
