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
    user: { type: Number, ref: 'User' },
    replies: [
        {
            body: String,
            movie: Number,
            date: Date,
            user: Number
        }
    ]
});
Comment_Schema.plugin(autoIncrement.plugin, 'Comment');
var Comment = mongoose.model('Comment', Comment_Schema);


var Movie_Schema = new Schema({
    movie: Number
});
var Movie = mongoose.model('Movie', Movie_Schema);

function addComment(req, res, next) {
    console.log(req.params.movie);
    console.log(req.user);
    var time = new Date();
    var newComment = new Comment({
        body: req.body.message,
        movie: req.params.movie,
        date: time,
        replies: [],
        user: req.user._id
    });
    req.session.comment = newComment;
    newComment.save();
    Movie
        .findOne({movie: req.params.movie})
        .exec(function(err, movie){
            if(err || !movie){
                return next();
            }
            else{
                req.body.user = req.user.local.name;
                req.body.date = req.session.comment.date;
                res.send(req.body);
            }
        });
}

function addmovie(req, res, next){
    var movie = new Movie({
        movie: req.params.movie
    });
    movie.save();
    req.body.user = req.user.local.name;
    req.body.date = req.session.comment.date;
    res.send(req.body);
}

function addReply(req, res, next) {
    console.log('received');
    var body = req.body;

    Comment.findOneAndUpdate(
        {movie: req.params.movie, _id: req.params.comment},
        {$push: {"replies": {
            body: body.message,
            movie: req.params.movie,
            date: new Date(),
            user: req.user._id
        }}},
        {safe: true, upsert: true},
        function(err, model) {
            console.log(err);
        }
    );

    res.send(request.body);
    console.log('done');
}

module.exports = {
    User : User,
    Movie: Movie,
    Comment: Comment,
    addComment: addComment,
    addMovie: addmovie,
    addReply: addReply
};