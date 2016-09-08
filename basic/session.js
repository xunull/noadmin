var uuid = require('node-uuid');

/**
 * 本平台中的session 对象
 */
class Session {

    constructor() {
        this.id = uuid.v4();
        Object.defineProperty(this, 'map', {
            value: new Map(),
            writable: false
        })
        // this.loginUser={};
    };
    set(key, value) {
        this.map.set(key, value);
    };
    get(key) {
        return this.map.get(key);
    };

}

module.exports = Session;
