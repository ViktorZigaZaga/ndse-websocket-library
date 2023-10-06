const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    login: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        default: '',
    },
    id: {
        type: String,
        default: '',
    },
});

module.exports = model('users', userSchema);