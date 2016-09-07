var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccessPath=require('./access_path').schema;

var UserAccessPath = new Schema({
    username: String,
    access: [AccessPath],
    level:[Number],
});

UserAccessPath.index({
    username: 1
});

mongoose.model('UserAccessPath', UserAccessPath);

exports.schema=UserAccessPath;
