var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var BasicProperty = require('./basic_property');

var Menu = new Schema(_.assign({
    name: {
        type: String
    },
    uri: {
        type: String
    },
    level: {
        type: Number
    },
    menu_icon: {
        type: String
    },
    pmenuid: {
        type: String
    }
}, BasicProperty));

mongoose.model('Menu', Menu);

exports.schema = Menu;
