var store = new Map();

var sessionCount = 0;

exports.storeSession = function(nosession) {
    sessionCount++;
    store.set(nosession.socketid, nosession);
}

// 获取一个session
exports.getSession = function(socketid) {
    return store.get(socketid);
}

// 删除一个session
exports.removeSession = function(socketid) {
    sessionCount--;
    store.delete(socketid);
}

// 获取当前有效的session的数量
exports.getSessionCount = function() {
    return sessionCount;
}
