var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _ = require('lodash');

var OperateRecord = require('./operate_record');

var RoleAccessPath = new Schema(_.assign({
    roleid: Schema.Types.ObjectId,
    whitelist: [],
    blacklist: []
}, OperateRecord));

mongoose.model('RoleAccessPath',RoleAccessPath);

exports.schema=RoleAccessPath;
