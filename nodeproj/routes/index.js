var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'home' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'register' });
});

module.exports = router;
