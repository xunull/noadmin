var redis = require('redis'),
	redis_port = 12312,
	redis_host = "127.0.0.1",
	redis_opts = {},
	redis_password=123456;
	client = redis.createClient(redis_port,redis_host,redis_opts);

var logger = global.thisapp.logger;

client.auth(redis_password,function(){
  logger.info('redis 登录成功');
});

client.on('ready',function(){
	logger.info('redis ready');
});

client.on('connect',function(){

});

client.on('reconnecting',function(){

});

client.on('error',function(){
	logger.info('redis 发生了错误');
});

client.on('end',function(){

});

exports.hgetall = function(key,func) {
	client.hgetall(key,function(err,obj){
		console.log('--------------');
		console.log('redis hgetall is :');
		console.log(key);
		console.log(obj);
		console.log('--------------');
		func(obj);
	});
};

exports.hdel = function(hashkey,key,func) {
	client.hdel(hashkey,key);
};

exports.hset = function(hashkey,key,value,func) {
	client.hset(hashkey,key,value,func);
};

exports.hmset = function(key,obj) {
	client.hmset(key,obj);
};
