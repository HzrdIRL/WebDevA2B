var express = require('express');
//var mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'home', success: req.session.success, errors: req.session.errors, email: req.session.email, password: req.session.password  });
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'register' });
});

router.post('/submit', function(req, res, next){
    req.check('email', 'Invalid email address').isEmail();
    req.check('password', 'Password is invalid').isLength({min : 4});

    var errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        req.session.success = false;
    }
    else{
        req.session.success = true;
        req.session.email = req.body.email;
        req.session.password = req.body.password;
    }
    res.redirect('/');
});

module.exports = router;
