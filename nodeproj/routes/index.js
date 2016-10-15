var express = require('express');
var mongoose = require('mongoose');
var db = require('../models/db');
var router = express.Router();
var movieDB = require('moviedb')('84c5c5e5c0b722ea081108dbb52810f1');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    movieDB.searchMovie({query: 'Star Trek'}, function(err, result){
        if(err) console.log(err);
        res.render('index', { title: 'Home', movies: result.results, loggedIn: req.isAuthenticated()});
    });
});

// GET Login Page
router.get('/login', function(req, res, next) {
    var errors = req.session.errors;
    req.session.errors = null;
    res.render('login', { title: 'Login', loggedIn: req.isAuthenticated(), errors: req.session.errors, email: req.session.email, password: req.session.password, message: req.flash('error')});
});

//GET Register Page
router.get('/register', function(req, res, next) {
    var errors = req.session.errors;
    req.session.errors = null;
    res.render('register', { title: 'Register', loggedIn: req.isAuthenticated(), name: req.session.name, errors: errors, email: req.session.email, message: req.flash('error')});
});

//GET Logout Page
router.get('/logout', function(req, res, next){
    req.logOut();
    res.redirect('/');
});

//POST Login
router.post('/submitLogin', function(req, res, next){
        req.check('email', 'Please enter a valid email address.').isEmail();
        req.check('password', 'Password is invalid').matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[ \/\[\]]).+/, "g");
        var errors = req.validationErrors();
        if(errors){
            req.session.errors = errors;
            res.redirect("/login");
        }else{
            next();
        }
    }, passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

//POST Register
router.post('/submitReg', function(req, res, next){
    req.check('name', 'Alias does not meet the criteria.').notEmpty();
    req.check('email', 'Email does not meet the criteria.').isEmail();
    req.check('password', 'Password does not meet the criteria.').isLength({min: 4}).matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*[ \/\[\]]).+/, "g");
    req.check('confirmPassword', 'Confirmation password must match.').equals(req.body.password);
    req.check('name', 'Alias does not meet the criteria.').matches(/\w+/, 'g');
    var errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        res.redirect("/register");
    }else{
        next();
    }
}, passport.authenticate('local-signup', {
        successRedirect: '/login',
        failureRedirect: '/register',
        failureFlash: true
    })
);

//GET Contact Us Page
router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Contact Us', loggedIn: req.isAuthenticated()});
});

//GET About Us Page
router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About TrekTalk', loggedIn: req.isAuthenticated()});
});

module.exports = router;