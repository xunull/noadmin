class User {
    constructor() {
        Object.defineProperty(this, 'map', {
            value: new Map(),
            writable: false
        });
    };
    set(key, value) {
        this.map.set(key, value);
    };

}

module.exports = User;
