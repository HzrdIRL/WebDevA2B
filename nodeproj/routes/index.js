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
    res.render('register', { title: 'Register', loggedIn: req.session.loggedIn, errors: req.session.errors, email: req.session.email, password: req.session.password  });
});

router.post('/submitLogin', function(req, res, next){
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Password is invalid').isLength({min : 4});

    var errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        req.session.loggedIn = false;
    }
    else{
        req.session.loggedIn = true;
        req.session.email = req.body.email;
        req.session.password = req.body.password;
    }
    res.redirect('/');
});

router.post('/submitReg', function(req, res, next){
    req.check('name', 'Invalid email address').notEmpty();
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Password is invalid').isLength({min : 4}).equals("confirm password");

    var errors = req.validationErrors(true);
    if(errors){
        req.session.errors = errors;
        req.session.registered = false;
        res.redirect('/register');
    }
    else{
        req.session.registered = true;
        req.session.email = req.body.email;
        req.session.password = req.body.password;
    }
    res.redirect('/');
});

module.exports = router;
