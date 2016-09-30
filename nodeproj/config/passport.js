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

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        function(req, email, password, done) {
            process.nextTick(function() {
                req.session.errors = null;
                req.check('name', 'A name was empty...').notEmpty();
                req.check('email', 'A field was empty...').notEmpty();
                req.check('password', 'A field was empty...').notEmpty();
                req.check('confirmPassword', 'Confirmation password must match').equals(password);
                req.check('email', 'Invalid email format').isEmail();
                //req.check('password', 'Password must match requirements').Length(4);
                var errors = req.validationErrors();
                console.log('testing');
                if(!errors) {
                    console.log('no errors');
                    db.User.findOne({'local.email': email}, function (err, user) {
                        if (err)
                            return done(err);
                        if (user) {
                            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
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
                }else{
                    req.session.errors = errors;
                    console.log('errors');
                    return done(null, false, req.flash('signupMessage', 'invalid input.'));
                }
            });
        }));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        function(req, email, password, done) {
            db.User.findOne({ 'local.email':  email }, function(err, user) {
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                return done(null, user);
            });
        }));

}