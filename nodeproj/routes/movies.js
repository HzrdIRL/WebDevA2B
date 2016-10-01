/**
 * Created by Hails on 28/09/2016.
 */
var express = require('express');
var mongoose = require('mongoose');
var db = require('../models/db');
var request = require('request');
var router = express.Router();
var movieDB = require('moviedb')('84c5c5e5c0b722ea081108dbb52810f1');
var passport = require('passport');

router.get('/', function(req, res, next){
   res.send('you have boldly gone too far, turn back');
});

router.get('/:movie', function(req, res, next){
    movieDB.movieInfo({id: req.params.movie}, function(err, result){
        if(err) console.log(err);
        var info = result;

        db.Comment
            .find({movie: req.params.movie})
            .exec(function(err, comments){
                if(err) return handleError(err);
                res.render('movie', {movie: info, comments: comments});
        });
    });
});

router.get('/:movie/comments/:comment', function (req, res, next) {
    db.Comment
        .findOne({movie: req.params.movie, _id: req.params.comment})
        .exec(function(err, commentInfo){
            if(err) return handleError(err);
            console.log(commentInfo);
        });
});

router.post('/:movie/comments', isLoggedIn, function (req, res, next) {
    console.log('received');
    var body = req.body;
    console.log(body);
    req.session.successUpdate = false;
    var comment = db.Comment({
        body: body.message,
        movie: req.params.movie,
        date: new Date(),
        inReply: null,
        replies: [],
        user: mongoose.Types.ObjectId(req.user._id)
    });
    comment.save();
    var commentId = comment._id;
    var movie = db.Movie.findOne(
        {movie: req.params.movie},
        function(err, movie){
            if(err){
                req.session.successUpdate = false;
            }
        }
    );
    if(movie != null) {
        db.Movie.findOneAndUpdate(
            {movie: req.params.movie},
            {$push: {comments: mongoose.Types.ObjectId(commentId)}},
            {safe: true, upsert: true},
            function (err, model) {
                console.log(err);
            }
        );
        req.session.successUpdate = true;
        console.log('updated');
    }
    if(movie == null){
        var movie = db.Movie({
            movie: req.params.movie,
            comments : [mongoose.Types.ObjectId(commentId)]
        });
        movie.save();
        console.log('new');
    }
    req.body.user = req.user.name;
    req.body.date = comment.date;
    res.send(req.body);
    console.log('done');
});


router.post('/:movie/comments/:comment/reply', isLoggedIn, function (req, res, next) {
    console.log('received');
    var body = req.body;
    console.log(body);
    var comment = db.Comment({
        body: body.message,
        movie: req.params.movie,
        date: new Date(),
        inReply : mongoose.Types.ObjectId(req.params.comment),
        replies : [],
        user: mongoose.Types.ObjectId(req.user._id)
    });
    comment.save();
    var commentId = comment._id;
    db.Comment.findOneAndUpdate(
        {movie: req.params.movie, _id: req.params.comment},
        {$push: {"replies": mongoose.TypesObjectId(commentId)}},
        {safe: true, upsert: true},
        function(err, model) {
            console.log(err);
        }
    );
    res.send(request.body);
    console.log('done');
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated() && req.user){
        return next();
    }
    res.redirect('/');
}
