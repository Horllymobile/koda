const { Strategy } = require('passport-local');
const User = require('./../models/Users');
const bcrypt = require('bcrypt');

module.exports = function(passport) {
    passport.use(new Strategy({ usernameField: 'email'},(email, password, done) => {
        User.findOne({email})
        .then(user => {
            if (!user) return done(null, false, {msg: 'User with this email is not found'});

            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) return done(null, user);
                return done(null, false, {msg: 'Password incorrect'})
            })
            .catch(error => {
                console.log(error);
            })
        }).catch(error => {
            console.log(error);
        });
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id)
        .then(user => {
            return done(null, user);
        })
        .catch((error) => {
            console.log(error);
        });
    });
}