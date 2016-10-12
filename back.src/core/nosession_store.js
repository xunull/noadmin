var store = new Map();
var sessionCount = 0;

exports.storeSession = function(nosession) {
    sessionCount++;
    store.set(nosession.nosessionid, nosession);
}

exports.getSession = function(nosessionid) {
    sessionCount--;
    return store.get(nosessionid);
}

exports.getSessionCount = function() {
    return sessionCount;
}
