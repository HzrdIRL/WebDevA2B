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

//User Schema
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

//Comment Schema
var Comment_Schema = new Schema({
    body: String,
    movie: Number,
    date: Date,
    user: { type: Number, ref: 'User' },
    replies: [
        {
            body: String,
            movie: Number,
            date: Date,
            user: {type: Number, ref: 'User'}
        }
    ]
});
Comment_Schema.plugin(autoIncrement.plugin, 'Comment');
var Comment = mongoose.model('Comment', Comment_Schema);

//Movie Schema
var Movie_Schema = new Schema({
    movie: Number
});
var Movie = mongoose.model('Movie', Movie_Schema);

//Middleware Add Comment
function addComment(req, res, next) {
    var time = new Date();
    var newComment = new Comment({
        body: req.body.message,
        movie: req.params.movie,
        date: time,
        replies: [],
        user: req.user._id
    });
    req.session.comment = newComment;
    newComment.save(function(err, comment){
        Movie
            .findOne({movie: req.params.movie})
            .exec(function(err, movie){
                if(err || !movie){
                    req.session.comment = comment;
                    return next();
                }
                else{
                    req.body.user = req.user.local.name;
                    req.body.date = req.session.comment.date;
                    req.body.comment = comment;
                    res.send(req.body);
                }
            });
        });
}

//Middleware Add Movie
function addmovie(req, res, next){
    var movie = new Movie({
        movie: req.params.movie
    });
    movie.save();
    req.body.comment = req.session.comment;
    req.body.user = req.user.local.name;
    req.body.date = req.session.comment.date;
    res.send(req.body);
}

//Middleware Add Reply
function addReply(req, res, next) {
    var body = req.body;
    Comment.findOneAndUpdate(
        {_id: req.params.comment},
        {$push: {"replies": {
            body: body.message,
            movie: req.params.movie,
            date: new Date(),
            user: req.user._id
        }}},
        {safe: true, upsert: true},
        function(err, model) {
            if(err){
                console.log(err);
            }
        }
    );
    req.body.user = req.user.local.name;
    req.body.date = req.session.comment.date;
    res.send(req.body);
}

module.exports = {
    User : User,
    Movie: Movie,
    Comment: Comment,
    addComment: addComment,
    addMovie: addmovie,
    addReply: addReply
};