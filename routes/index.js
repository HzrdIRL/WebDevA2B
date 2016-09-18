var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = mongoose.model('Task');
var Sub_Task = mongoose.model('Sub_Task');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {title: "Express"});
});

module.exports = router;
