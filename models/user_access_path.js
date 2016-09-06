var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserAccessPath = new Schema({
  username:String,
  path:{}
});

UserAccessPath.index({username:1});

mongoose.model('UserAccessPath',UserAccessPath);
