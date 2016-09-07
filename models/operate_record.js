var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var OperateRecord={
  create_date: {type:Date,default:Date.now},
  create_user: Schema.Types.ObjectId,
  update_date: Date,
  update_user: Schema.Types.ObjectId,
};

module.exports=OperateRecord;
