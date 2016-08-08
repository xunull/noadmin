var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var _ = require('lodash');

var UserSchema = new Schema({
  name: { type: String},
  loginname: { type: String},
  pass: { type: String },
  email: { type: String},
  url: { type: String },
  profile_image_url: {type: String},
  location: { type: String },
  signature: { type: String },
  profile: { type: String },
  avatar: { type: String },
  is_block: {type: Boolean, default: false},

  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  level: { type: String },
  active: { type: Boolean, default: false },

  accessToken: {type: String},
});

UserSchema.index({loginname: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});

mongoose.model('User', UserSchema);
