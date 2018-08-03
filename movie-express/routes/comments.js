//modified tasks
const express = require('express');
const router  = express.Router();
const passport   = require('passport');
const Comment = require('../models/comment');
const Review = require('../models/review');
const User=require('../models/user')
//unshift
router.get('/comment', (req, res, next)=>{
    Comment.find()
    .then((allTheComments)=>{
        res.json(allTheComments);
    })
    .catch((err)=>{
        res.json(err);
    })
})
router.get('/comment/:id', (req, res, next)=>{
    Comment.findById(req.params.id)
    .then((theComment)=>{
        res.json(theComment);
    })
    .catch((err)=>{
        res.json(err);
    })
})

router.post('/comment/create', (req, res, next)=>{
    Comment.create({
        user: req.user._id,
        movie: req.body.movie,
        review: req.body.review,
        comment: req.body.comment,
    })
    .then((newComment)=>{
        Review.findById(newComment.review)
        .then(reviewFromDb=>{
            reviewFromDb.comments.push(newComment);
            reviewFromDb.save();
            res.status(200).json({
                comment: newComment,
                review: reviewFromDb
            })
            .catch(err => {
              res.status(500).json({ message: "save and update error" })
            })
          })
        })
    })
// Comment.create({
//     blah: "a;sdjf",
//     blah: ";ajsflkj"
//   })
  
//   .then(commentResponse => {
//     Review.findById(req.params.id)
//     .then(reviewFromDb => {
//       reviewFromDb.comments.push(commentResponse);
//       reviewFromDb.save();
//       res.status(200).json({
//         comment: commentResponse,
//         review: reviewFromDb
//       })
//       .catch(err => {
//         res.status(500).json({ message: "save and update error" })
//       })
//     })
//   })

//was patch simplified to post
//this should only change the title review and rating, changing other stuff would not make sense
router.post('/comment/update/:id/', (req, res, next)=>{
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
router.delete('/comment/delete/:id/', (req, res, next)=>{
    Comment.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err);
    })
})

module.exports = router;