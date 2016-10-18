var mongoose = require('mongoose');
var _ = require('lodash');
var Schema = mongoose.Schema;

var BasicProperty = require('./basic_property');
/**
 * 一个人可以有多个角色
 * @type {Schema}
 */
var UserRole = new Schema(_.assign({
    userid: Schema.Types.ObjectId,
    roleids: [Schema.Types.ObjectId]
}, BasicProperty));

mongoose.model('UserRole', UserRole);

exports.schema = UserRole;
