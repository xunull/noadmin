var mongoose = require('mongoose');
var config = global.thisapp.config;
var logger = global.thisapp.logger;

// mongoose.connect('mongodb://localhost/noadmin');

mongoose.connect(config.mongodb, {
    server: {
        poolSize: 20
    }
});

var db = mongoose.connection;

db.on('error', function() {
    logger.info('mongoose has an error');
});

db.once('open', function() {
    logger.info('mongoose has connecting');
});

exports.Schema = mongoose.Schema;
exports.mongoose = mongoose;
exports.db = db;
