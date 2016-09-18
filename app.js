var mongoose = require('mongoose');
var express = require('express');
var app = express();
var path = require('path');
require('./models/Tasks');
require('./models/Sub_Tasks');
mongoose.connect('mongodb://localhost/StudyDB');

app.set('view engine', 'ejs');

var routes = require('./routes/index');
app.use('/', routes);

app.use('/public', express.static('public'));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
