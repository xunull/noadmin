var mongoose = require('mongoose');
var config = global.thisapp.config;
var logger = global.thisapp.logger;

require('./user');
require('./menu');
require('./user_menu');

exports.User = mongoose.model('User');
exports.Menu = mongoose.model('Menu');
exports.UserMenu = mongoose.model('UserMenu');
