//modified tasks
const express = require('express');
const router  = express.Router();
const passport   = require('passport');
const Comment = require('../models/comment');
const Review = require('../models/review');
const User=require('../models/user')


//works
//this shows all the comments on the app lol.  not that useful except during development
router.get('/comments', (req, res, next)=>{
    Comment.find()
    .populate('review')
    .then((allTheComments)=>{
        res.json(allTheComments);
    })
    .catch((err)=>{
        res.json(err);
    })
})

//works - shows particular comment by its id.  
router.get('comment/:id', (req, res, next)=>{
    Comment.findById(req.params.id)
    .populate('review')
    .then((theComment)=>{
        res.json(theComment);
    })
    .catch((err)=>{
        res.json(err);
    })
})
//works shows all comments of a particular review
router.get('/reviewcomments/:review', (req, res, next)=>{
    Comment.find({review: req.params.review
    })
    .populate('review')
    .then((theComments)=>{
        res.json(theComments);
    })
    .catch((err)=>{
        res.json(err)
    })
})
//works shows all comments of a particular review
router.get('/usercomments/', (req, res, next)=>{
    Comment.find({user: req.user._id
    })
    .populate('review')
    .then((theComments)=>{
        res.json(theComments);
    })
    .catch((err)=>{
        res.json(err)
    })
})

//creates a comment for a review a movie, returns the review and the comment...
router.post('/commentcreate', (req, res, next)=>{
    Comment.create({
        user: req.user._id,
        tmdb: req.body.tmdb,
        imdb: req.body.imdb,
        review: req.body.review,
        comment: req.body.comment,
    })
    .then((newComment)=>{
        req.user.commentsMade.push(newComment._id);
        req.user.save();
        Review.findById(req.body.review)
        .then(reviewFromDb=>{
            console.log(newComment._id)
            reviewFromDb.comments.push(newComment._id);
            reviewFromDb.save();
            res.status(200).json({
                comment: newComment,
                review: reviewFromDb
            })
          })
          .catch(err => {
            res.status(500).json({ message: "save and update error" })
          })
        })
    })

router.post('/commentupdate/:id/', (req, res, next)=>{
    Comment.findByIdAndUpdate(req.params.id, {
        user: req.body.user,
        comment: req.body.comment,
        edited: true,
    })
    .then((theComment)=>{
        res.json(theComment)
    })
    .catch((err)=>{
        res.json(err);
    })
})
//may sometimes want to keep deleted comments and review and make them undisplayed instead....in real life
//make sure to make this a delete request in the angular side as well
router.delete('/commentdelete/:id/', (req, res, next)=>{
    Comment.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err);
    })
})

module.exports = router;