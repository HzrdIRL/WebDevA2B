var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    //bcrypt = require('bcrypt'),
    autoIncrement = require('mongoose-auto-increment'),
    //db = mongoose.createConnection("mongodb://LocalHost/StudyDB");
require('mongoose-type-email');

// db connection error handling
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){});

autoIncrement.initialize(db);


var Users_Schema = new Schema({
  firstName: String,
  lastName: String,
  email: {type: Schema.Types.Email, required: true},
  password: {type: String, required: true},
  google_id: Number
});

Users_Schema.plugin(autoIncrement.plugin, {model: 'User', field: 'userID'});

var User = db.model('User', Users_Schema);
