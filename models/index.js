var mongoose = require('mongoose');
var config = global.thisapp.config;
var logger = global.thisapp.logger;

require('./user');

exports.User = mongoose.model('User');
