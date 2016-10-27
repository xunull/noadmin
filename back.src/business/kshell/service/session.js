const crypto = global.thisapp.common.crypto;
const sessionStore = require('./session_store');

class Session {
    construtor(user,socketid,pwd) {
        this.user = user;
        this.socketid = socketid;
        this.pwd = pwd;
        sessionStore.storeSession(this);
    }
    cipher(data) {
        return crypto.cipher(data,this.pwd);
    }
    decipher(data) {
        return crypto.decipher(data,this.pwd);
    }
    destory() {
        sessionStore.removeSession(this.socketid);
    }

}
