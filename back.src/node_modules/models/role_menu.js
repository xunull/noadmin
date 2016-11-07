var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var BasicProperty = require('./basic_property');

var RoleMenu = new Schema(_.assign({
    roleid: Schema.Types.ObjectId,
    menus: []
}, BasicProperty));

mongoose.model('RoleMenu', RoleMenu);

exports.schema = RoleMenu;
