/**
 * Created by ppp on 30/09/2016.
 */
var LocalStrategy = require('passport-local').Strategy; //local login
var mongoose = require('mongoose');
var db = require('../models/db');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        db.User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //Signup Strategy
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            process.nextTick(function() {
                db.User.findOne({'local.email': email}, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, {message: 'That email is already taken.'});
                    } else {
                        var newUser = new db.User();
                        newUser.local.name = req.body.name;
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));

    //Login Strategy
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            db.User.findOne({ 'local.email':  email }, function(err, user) {
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, {message: 'No user found.'});
                if (!user.validPassword(password))
                    return done(null, false, {message: 'Oops! Wrong password.'});
                return done(null, user);
            });
        }));

};