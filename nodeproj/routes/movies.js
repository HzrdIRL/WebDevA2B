/**
 * Created by Hails on 28/09/2016.
 */
var express = require('express');
var mongoose = require('mongoose');
var db = require('../models/db');
var request = require('request');
var router = express.Router();
var movieDB = require('moviedb')('84c5c5e5c0b722ea081108dbb52810f1');

router.get('/', function(req, res, next){
   res.send('you have boldly gone too far, turn back');
});

router.get('/:movie', function(req, res, next){
    movieDB.movieInfo({id: req.params.movie}, function(err, result){
        if(err) console.log(err);
        var info = result;

        db.Movie
            .find({id: req.params.movie})
            .populate('comments')
            .exec(function(err, movie){
                if(err) return handleError(err);
                var comments = movie.comments;
                console.log(comments);
                res.render('movie', {movie: info, comments: comments});
        });
    });
});

router.get('/:movie/comments/:comment', function (req, res, next) {
    db.Comment
        .findOne({movie: req.params.movie, id: req.params.comment})
        .exec(function(err, commentInfo){
            if(err) return handleError(err);
            console.log(commentInfo);
        });
});

router.post('/:movie/comments', function (req, res, next) {
    db.Movie.findOneAndUpdate(
        {movie: req.params.movie},
        {$push: {"comments": {body: body, user: user}}},
        {safe: true, upsert: true},
        function(err, model) {
            console.log(err);
        }
    );
});

module.exports = router;