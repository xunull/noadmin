var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var OperateRecord = require('./operate_record');

var AccessPath = new Schema(_.assign({
    name: String,
    path: String,
    level:Number,
    id:String,
    dimension:[String],
    node: {
        type: Boolean,
        default: true
    },
},OperateRecord));

AccessPath.index({
    id: 1
});

// console.log(AccessPath);

mongoose.model('AccessPath', AccessPath);

exports.schema = AccessPath;
