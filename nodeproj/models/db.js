var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    //bcrypt = require('bcrypt'),
    autoIncrement = require('mongoose-auto-increment');
mongoose.connect("mongodb://localhost:27017/partB");
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


var Comment_Schema = new Schema({
    body: String,
    movie: Number,
    date: Date,
    user: {type: Schema.ObjectId, ref: User}
});
Comment_Schema.plugin(autoIncrement.plugin, 'Comment');
var Comment = mongoose.model('Comment', Comment_Schema);


var Movie_Schema = new Schema({
    movie: Number,
    comments: {type: Schema.ObjectId, ref: Comment}
});
var Movie = mongoose.model('Movie', Movie);


module.exports = {
    User : User,
    Movie: Movie,
    Comment: Comment
};