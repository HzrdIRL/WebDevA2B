var express = require('express');
var mongoose = require('mongoose');
var db = require('../models/db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'home', loggedIn: req.session.loggedIn, errors: req.session.errors, email: req.session.email, password: req.session.password  });
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'register' });
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
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Password is invalid').isLength({min : 4}).equals("Confirm Password");

    var errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        req.session.registered = false;
    }
    else{
        req.session.registered = true;
        req.session.email = req.body.email;
        req.session.password = req.body.password;
    }
    res.redirect('/Users:User');
});

module.exports = router;
