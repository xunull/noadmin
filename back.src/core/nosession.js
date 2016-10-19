var uuid = require('node-uuid');
var nosession_store = require('./nosession_store');

/**
 * 本平台中的session 对象
 */
class Session {

    constructor() {
        this.nosessionid = uuid.v4();
        this.create_time = Date.now();
        // session 的有效钱是20秒
        this.expires_on = this.create_time + 1200000;
        Object.defineProperty(this, 'map', {
            value: new Map(),
            writable: false
        });
        nosession_store.storeSession(this);
    };
    set(key, value) {
        this.map.set(key, value);
    };
    get(key) {
        return this.map.get(key);
    };
    keys() {
        return this.map.keys;
    };
    destory() {
        nosession_store.removeSession(this.nosessionid);
    }
}

module.exports = Session;
