/**
 * Created by Hails on 28/09/2016.
 */
var express = require('express');
var mongoose = require('mongoose');
var db = require('../models/db');
var router = express.Router();
var movieDB = require('moviedb')('84c5c5e5c0b722ea081108dbb52810f1');
var passport = require('passport');

//GET Index Page
router.get('/', function(req, res, next){
   res.redirect('/');
});

//GET Movie Details Page
router.get('/:movie', function(req, res, next){
    movieDB.movieInfo({id: req.params.movie}, function(err, result){
        if(err) console.log(err);
        var info = result;

        db.Comment.find({movie: req.params.movie}).populate('user').exec(function(err, comments){
            if(err) console.log(err);
            res.render('movie', {movie: info, comments: comments, loggedIn: req.isAuthenticated()});
        });
    });
});

//GET specific Comment
router.get('/:movie/comments/:comment', function (req, res, next) {
    /*db.Comment
        .findOne({movie: req.params.movie, _id: req.params.comment})
        .exec(function(err, commentInfo){
            if(err) return handleError(err);
        });*/
    res.redirect('/movies/'+req.params.movie);
});

//POST Add Comment
router.post('/:movie/comments',
    isLoggedIn,
    function(req, res, next){
        req.check('message', 'Comment cannot be empty').notEmpty();
        req.check('message', 'Must only contain plain text').matches(/\w+/, 'g');
        var errors = req.validationErrors();
        if(!errors){
            return next();
        }
        res.send({errors:'Message cannot be empty'});
    },
    db.addComment,
    db.addMovie
);

//POST Add Reply
router.post('/:movie/comments/:comment/reply', isLoggedIn, db.addReply);

module.exports = router;

//Middleware loggedIn checking
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.send({redirect: '/login'});
}
