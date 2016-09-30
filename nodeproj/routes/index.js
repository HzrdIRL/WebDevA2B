var express = require('express');
var mongoose = require('mongoose');
var db = require('../models/db');
var request = require('request');
var router = express.Router();
var movieDB = require('moviedb')('84c5c5e5c0b722ea081108dbb52810f1');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    movieDB.searchMovie({query: 'Star Trek'}, function(err, result){
        if(err) console.log(err);
        res.render('index', { title: 'Home', movies: result.results});
    });
});

router.get('/login', function(req, res, next) {
    var errors = req.session.errors;
    req.session.errors = null;
    res.render('login', { title: 'Login', loggedIn: req.session.loggedIn, errors: req.session.errors, email: req.session.email, password: req.session.password  });
});

router.get('/register', function(req, res, next) {
    var errors = req.session.errors;
    req.session.errors = null;
    res.render('register', { title: 'Register', loggedIn: req.session.loggedIn, name: req.session.name, errors: errors, email: req.session.email});
});

router.post('/submitLogin', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}));

router.post('/submitReg', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true,
}));

module.exports = router;