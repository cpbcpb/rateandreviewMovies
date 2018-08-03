//modified tasks
const express = require('express');
const router  = express.Router();
const passport   = require('passport');
const Review = require('../models/review');

router.get('/review', (req, res, next)=>{
    Review.find()
    .then((allTheReviews)=>{
        res.json(allTheReviews);
    })
    .catch((err)=>{
        res.json(err);
    })
})
router.get('/review/:id', (req, res, next)=>{
    Review.findById(req.params.id)
    .then((theReview)=>{
        res.json(theReview);
    })
    .catch((err)=>{
        res.json(err);
    })
})

router.post('/review/create', (req, res, next)=>{
    Review.create({
        title: req.body.title,
        review: req.body.review,
        rating: req.body.rating,
        user: req.user._id,
        movie: req.body.movie,
        comments: [],
    })
    .then((response)=>{
            // User.findByIdAndUpdate(req.user._id,{ $push: {reviewsMade: response._id}})
            req.user.reviewsMade.push(response._id);
            
            
            req.user.save();
        res.json(response)
    })
    .catch((err)=>{
        res.json(err);
    })
})
//was patch simplified to post
//this should only change the title review and rating, changing other stuff would not make sense
router.post('/review/update/:id/', (req, res, next)=>{
    Review.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        review: req.body.review,
        rating: req.body.rating
    })
    .then((theReview)=>{
        res.json(theReview)
    })
    .catch((err)=>{
        res.json(err);
    })
})
//make sure to make this a delete request in the angular side as well
router.delete('/review/delete/:id/', (req, res, next)=>{
    Review.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err);
    })
})

module.exports = router;