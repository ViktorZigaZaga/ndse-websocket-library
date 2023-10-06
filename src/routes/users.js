const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');
const Profile = require('../db/Profile');
const User = require('../models/UserSchema');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post(
    '/login', 
    passport.authenticate('local', {
        session: true,
        failureRedirect: `api/user/login`,
    }),
    (req, res) => {
        res.redirect('api/books');
    }
);

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', async (req, res) => {
    const user = new User(new Profile(req.body));
    if (req.body.login && req.body.password) {
        try {
            await user.save();
        } catch (err) {
            res.status(500).json(err);
        }
    }
    res.redirect('api/books');
});

router.get('/me', 
    (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/api/user/login');
        }
        next();
    },
    (req, res) => {
        res.render('/auth/me', {
            user: req.user
        });
    }
);


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;