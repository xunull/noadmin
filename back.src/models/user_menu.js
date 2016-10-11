var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var OperateRecord = require('./operate_record');

var UserMenu = new Schema(_.assign({
    username: {
        type: String
    },
    menus: []
}, OperateRecord));

UserMenu.index({username: 1});

mongoose.model('UserMenu', UserMenu);
