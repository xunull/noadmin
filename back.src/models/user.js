var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var _ = require('lodash');

var BasicProperty = require('./basic_property');

var UserSchema = new Schema(_.assign({
  name: { type: String},
  loginname: { type: String},
  pass: { type: String },
  email: { type: String},
  url: { type: String },
  profile_image_url: {type: String},
  signature: { type: String },
  profile: { type: String },
  avatar: { type: String },
  is_block: {type: Boolean, default: false},

  level: { type: String },
  active: { type: Boolean, default: true },

  accessToken: {type: String},
},BasicProperty));

UserSchema.index({loginname: 1}, {unique: true});
// UserSchema.index({email: 1}, {unique: true});

mongoose.model('User', UserSchema);
