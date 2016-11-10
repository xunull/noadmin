const serverMap = require('../lib/serverFileOp').serverMap;
const serverYaml = require('../lib/serverFileOp').serverYaml;

exports.getwhois = function(req,res) {
    // res.reply('afafsafa');
    res.send('haha');
}

exports.getWhoisAllServer = function(req,res) {
    let result=[];
    for(let key in serverYaml) {
        result.push({name:key,address:serverYaml[key]});
    }
    console.log(result);
    res.reply({
        data:result
    });
}
