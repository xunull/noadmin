var mongoose = require('mongoose');
var config = global.thisapp.config;
var logger = global.thisapp.logger;

require('./user');
require('./menu');
require('./user_menu');
require('./access_path');
require('./user_access_path');
require('./role');
require('./user_role');
require('./role_access_path');
require('./role_menu');

exports.User = mongoose.model('User');
exports.Menu = mongoose.model('Menu');
exports.UserMenu = mongoose.model('UserMenu');
exports.AccessPath = mongoose.model('AccessPath');
exports.UserAccessPath = mongoose.model('UserAccessPath');
exports.Role = mongoose.model('Role');
exports.UserRole = mongoose.model('UserRole');
exports.RoleAccessPath = mongoose.model('RoleAccessPath');
exports.RoleMenu = mongoose.model('RoleMenu');
