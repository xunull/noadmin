var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var BasicProperty = require('./basic_property');
var UserMenu = new Schema(_.assign({
    username: {
        type: String
    },
    menus: []
}, BasicProperty));

UserMenu.index({username: 1});

mongoose.model('UserMenu', UserMenu);
