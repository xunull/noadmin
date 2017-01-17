const dns = require('dns');

function lookup(hostname){
    // 此方法是dns 方法中唯一一个会去查询 host 文件的方法
    // 其余的方法都会去dns服务器去查询
    dns.lookup(hostname,(err,address,family)=>{

    });
}
