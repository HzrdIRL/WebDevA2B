/**
 * Created by ppp on 30/09/2016.
 */
var LocalStrategy = require('passport-local').Strategy; //local login
var mongoose = require('mongoose');
var db = require('../models/db');

module.exports = function(passport) {

    passport.use(new LocalStrategy({usernameField: 'email'},
        function (username, password, done) {
            db.User.findOne({username: username}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (!user.verifyPassword(password)) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ));
}