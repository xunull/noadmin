var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var OperateRecord = require('./operate_record');
var AccessPath = require('./access_path').schema;

var UserAccessPath = new Schema(_.assign({
    username: String,
    whitelist: [],
    blacklist: []
}, OperateRecord));

UserAccessPath.index({username: 1});

mongoose.model('UserAccessPath', UserAccessPath);

exports.schema = UserAccessPath;
