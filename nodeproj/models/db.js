var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    autoIncrement = require('mongoose-auto-increment');
mongoose.connect("mongodb://localhost:27017/partB");
var db = mongoose.connection;
require("mongoose-type-email");

// db connection error handling
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){});

autoIncrement.initialize(db);

var Users_Schema = new Schema({
    local: {
        name: String,
        email: {type: mongoose.SchemaTypes.Email, required: true},
        password: {type: String, required: true},
        google_id: Number
    }
});

Users_Schema.plugin(autoIncrement.plugin, 'User');

Users_Schema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

Users_Schema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User', Users_Schema);

var Comment_Schema = new Schema({
    body: String,
    movie: Number,
    date: Date,
    user: {type: Schema.ObjectId, ref: User},
    inReply : {type: Schema.ObjectId, ref: Comment},
    replies: [{type: Schema.ObjectId, ref: Comment}]
});
Comment_Schema.plugin(autoIncrement.plugin, 'Comment');
var Comment = mongoose.model('Comment', Comment_Schema);


var Movie_Schema = new Schema({
    movie: Number,
    comments: [{type: Schema.ObjectId, ref: Comment}]
});
var Movie = mongoose.model('Movie', Movie_Schema);

module.exports = {
    User : User,
    Movie: Movie,
    Comment: Comment
};