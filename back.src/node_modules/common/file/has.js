const path = require('path');
var basic = require('./basic');

exports.hasFile = async function(dirname, file) {
    if (basic.isReturnPrefix(file)) {
        throw DontFindByReturnPrefix();
    }
    return basic.isExists(path.resolve(dirname, file));
}

function DontFindByReturnPrefix(message) {
    this.message = message;
    this.name = 'DontFindByReturnPrefix';
}
