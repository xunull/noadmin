var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccessPath=require('./access_path').schema;

var UserAccessPath = new Schema({
    username: String,
    paths: [Schema.Types.ObjectId],
});

UserAccessPath.index({
    username: 1
});

mongoose.model('UserAccessPath', UserAccessPath);

exports.schema=UserAccessPath;
