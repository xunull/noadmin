var uuid = require('node-uuid');
var nosession_store = require('./nosession_store');

/**
 * 本平台中的session 对象
 */
class Session {

    constructor() {
        this.nosessionid = uuid.v4();
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

    }

}

module.exports = Session;
