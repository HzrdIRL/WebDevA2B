var express = require('express');
var mongoose = require('mongoose');
var db = require('../models/db');
var request = require('request');
var router = express.Router();
var movieDB = require('moviedb')('84c5c5e5c0b722ea081108dbb52810f1');

/* GET home page. */
router.get('/', function(req, res, next) {
    movieDB.searchMovie({query: 'Star Trek'}, function(err, result){
        if(err) console.log(err);
        res.render('index', { title: 'Home', movies: result.results});
    });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login', loggedIn: req.session.loggedIn, errors: req.session.errors, email: req.session.email, password: req.session.password  });
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register', loggedIn: req.session.loggedIn, name: req.session.name, errors: req.session.errors, email: req.session.email});
});

router.post('/submitLogin', function(req, res, next){
    var user = null;
    req.check('email', 'Invalid format: Must be like host@host.com').isEmail();
    var errors = req.validationErrors();
    if(!errors){
        console.log('email okidoke :)');
        db.User.findOne({email: req.body.email}, function (err, user){
            if (err) {
                console.error('error, no entry found');
                res.redirect('/login');
            }else{
                req.session.matchPassword = user.password;
                req.check(req.body.password, 'Password is invalid: does not match the database');
                errors = null;
                errors = req.validationErrors();
                if (errors) {
                    console.error('failed to match password');
                    req.session.errors = errors;
                    req.session.loggedIn = false;
                    res.redirect('/login');
                } else {
                    console.log('password matched');
                    req.session.errors = null;
                    req.session.loggedIn = true;
                    req.session.name = user.name;
                    res.redirect('/');
                }
            }
        })
    }else{
        req.session.errors = errors;
        res.redirect('/login');
    }
});

router.post('/submitReg', function(req, res, next){
    req.check('name', 'Please enter an alias/name').notEmpty();
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Password is invalid: Password fields must match').equals(req.body.confirmPassword);
    req.check('password', 'Password is invalid: Must have at least four characters').isLength({min : 4});

    var errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        req.session.registered = false;
        req.session.name = req.body.name;
        req.session.email = req.body.email;
        res.redirect('/register');
    }
    else {
        req.session.errors = null;
        req.session.registered = true;
        req.session.name = req.body.name;
        var userInfo = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            google_id: null
        };
        var user = new db.User(userInfo);
        user.save();
        res.redirect('/');
    }
});

module.exports = router;
