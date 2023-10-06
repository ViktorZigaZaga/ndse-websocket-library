const passport = require('passport');
const strategy = require('passport-local');
const LocalStategy = strategy.Strategy;
const {verifyPassword, findById, findByUserName} = require('../db/users');

const verify = (login, password, done) => {
    findByUserName(login, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (!verifyPassword(user, password)) {
            return done(null, false);
        }
        return done(null, user);
    });
};

const options = {
    userNameField: 'user',
    passwordField: 'password'
};

passport.use('local', new LocalStategy(options, verify));

passport.serializeUser((user, callback) => {
    callback(null, user.id);
});

passport.deserializeUser((id, callback) => {
    findById(id, (err, user) => {
        if (err) {
            return callback(err);
        }
        callback(null, user);
    });
});

module.exports = passport;