var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    //bcrypt = require('bcrypt'),
    autoIncrement = require('mongoose-auto-increment'),
    db = mongoose.createConnection("mongodb://LocalHost/StudyDB");
require('mongoose-type-email');

// db connection error handling
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){});

autoIncrement.initialize(db);
