var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    //bcrypt = require('bcrypt'),
    autoIncrement = require('mongoose-auto-increment');
mongoose.connect("mongodb://localhost:27020");
var db = mongoose.connection;
require("mongoose-type-email");

// db connection error handling
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){});

autoIncrement.initialize(db);

var Users_Schema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: mongoose.SchemaTypes.Email, required: true},
    password: {type: String, required: true},
    google_id: Number
});

Users_Schema.plugin(autoIncrement.plugin, 'User');

var User = mongoose.model('User', Users_Schema);

module.exports = {
    User : User
};