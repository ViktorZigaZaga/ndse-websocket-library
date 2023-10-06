const { v4: uuid } = require('uuid');

class Profile {
    constructor(user) {
        this.login = user.login;
        this.password = user.password;
        this.displayName = user.displayName;
        this.id = uuid();
    }
}

module.exports = new Profile();