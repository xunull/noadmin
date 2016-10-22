var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _ = require('lodash');

var BasicProperty = require('./basic_property');

var Business = new Schema(_.assign({
    name:String,
    description:String,
},BasicProperty));


mongoose.model('Business',Business);

exports.schema=Business;
