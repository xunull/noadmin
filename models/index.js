var mongoose = require('mongoose');
var config = global.thisapp.config;
var logger = global.thisapp.logger;

require('./user');
require('./menu');
require('./user_menu');
require('./user_access_path');

exports.User = mongoose.model('User');
exports.Menu = mongoose.model('Menu');
exports.UserMenu = mongoose.model('UserMenu');
exports.UserAccessPath = mongoose.model('UserAccessPath');
