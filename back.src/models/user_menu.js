var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserMenu = new Schema({
    username: {type:String},
    menuObj:{}
});

UserMenu.index({username:1});

mongoose.model('UserMenu',UserMenu);
