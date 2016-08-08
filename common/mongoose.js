var mongoose = require('mongoose');

var logger = global.thisapp.logger;

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error',function(){
  console.log('mongoose has an error');
});

db.once('open',function(){
  console.log('mongoose has connecting');
});
