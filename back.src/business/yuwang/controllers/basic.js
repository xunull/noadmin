const fork = require('child_process').fork;
const path = require('path');

const fishpond = require('../service/fishpond');

exports.start = function(req, res, next) {
    fishpond.push(req.body);
    res.reply('haha');
}
