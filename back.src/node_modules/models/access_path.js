var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var BasicProperty = require('./basic_property');

var AccessPath = new Schema(_.assign({
    name: String,
    uri: String,
    level:Number,
    id:String,
    pid:String,
    dimension:[String],
},BasicProperty));

AccessPath.index({
    id: 1
});

// console.log(AccessPath);

mongoose.model('AccessPath', AccessPath);

exports.schema = AccessPath;
