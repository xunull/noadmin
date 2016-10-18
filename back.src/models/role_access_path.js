var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _ = require('lodash');

var BasicProperty = require('./basic_property');

var RoleAccessPath = new Schema(_.assign({
    roleid: Schema.Types.ObjectId,
    whitelist: [],
    blacklist: []
}, BasicProperty));

mongoose.model('RoleAccessPath',RoleAccessPath);

exports.schema=RoleAccessPath;
