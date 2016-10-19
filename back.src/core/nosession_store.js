var store = new Map();
// 存储session的过期时间
var storeExpireTime = new Map();
var sessionCount = 0;

exports.storeSession = function(nosession) {
    sessionCount++;
    store.set(nosession.nosessionid, nosession);
    storeExpireTime.set(nosession.nosessionid, nosession.expires_on);
}

// 获取一个session
exports.getSession = function(nosessionid) {
    return store.get(nosessionid);
}

// 删除一个session
exports.removeSession = function(nosessionid) {
    sessionCount--;
    store.delete(nosessionid);
}

// 获取当前有效的session的数量
exports.getSessionCount = function() {
    return sessionCount;
}
