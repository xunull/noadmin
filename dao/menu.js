var models = require('../models');
var Menu = models.Menu;
var uuid = require('uuid');

var logger = global.thisapp.logger;

exports.getUserMenu = function(userid) {

};

exports.saveAMenu = function( name,
                              level,
                              menu_icon,
                              userid,
                              pmenuid,
                              callback) {

    let menu = new Menu();
    menu.name = name;
    menu.level = level;
    menu.menu_icon = menu_icon;
    menu.userid = userid;
    menu.pmenuid = pmenuid;

    menu.save(function(err,menu){
        if(err) {
          logger.error(err);
          callback(err,menu);
        } else {
          callback(null,menu);
        }
    });
};
