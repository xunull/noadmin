var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var MenuSchema = new Schema({
  name: { type: String },
  level: { type: Number },
  menu_icon: { type: String },
  userid: { type:String },
  pmenuid: { type:String },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },

});

mongoose.model('Menu', MenuSchema);
