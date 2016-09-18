var mysql = require('mysql');
var logger = global.thisapp.logger;
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'xmsWeb'
});

exports.query = function(sql,params,func) {
  var this_arguments=arguments;
  pool.getConnection(function(err, connection) {
    if(this_arguments.length===2) {
      connection.query(this_arguments[0],function(err,rows){
        this_arguments[1](err,rows);
      });
    } else {
      connection.query(sql,params,function(err,rows){
        func(err,rows);
      });
    }

    // 释放连接，放回连接池
    connection.release();
  });
};
