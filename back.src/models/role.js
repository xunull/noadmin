var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var OperateRecord = require('./operate_record');

/**
 * 角色也可以继承,单继承
 * @type {Schema}
 */
var Role = new Schema(_.assign({
    name: String,
    description: String,
    parent: Schema.Types.ObjectId
}, OperateRecord));

mongoose.model('Role', Role);

exports.schema = Role;
