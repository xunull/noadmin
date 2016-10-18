var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var BasicProperty = require('./basic_property');

/**
 * 角色也可以继承,单继承
 * parent 字段 存储时， string 会自动转换成objectid
 * 角色的继承，也不能说是继承
 * 继承不了角色的权限等
 * 而是为了指明角色的从属关系
 *
 * 在创建的时候 ，如果是指定parent 会发生此困扰
 * 但如果转换成 创建 某个角色的子角色，这个就好理解一些
 * 
 * @type {Schema}
 */
var Role = new Schema(_.assign({
    name: String,
    description: String,
    parent: Schema.Types.ObjectId
}, BasicProperty));

mongoose.model('Role', Role);

exports.schema = Role;
