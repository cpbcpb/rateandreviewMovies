//modified tasks
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Review = require("../models/review");
const User = require("../models/user");

//works
router.get("/reviews", (req, res, next) => {
  Review.find()
    .populate("comments")
    .then(allTheReviews => {
      res.json(allTheReviews);
    })
    .catch(err => {
      res.json(err);
    });
});

//works
router.get("/bymovie/:tmdb", (req, res, next) => {
  Review.find({
    tmdb: req.params.tmdb
  })
    .populate("comments")
    .then(theReviews => {
      res.json(theReviews);
    })
    .catch(err => {
      res.json(err);
    });
});

//probably works
router.get("/byuser/:userid", (req, res, next) => {
  Review.find({
    user: req.params.userid
  })
    .populate("comments")
    .then(theReviews => {
      res.json(theReviews);
    })
    .catch(err => {
      res.json(err);
    });
});

//works
router.get("/:id", (req, res, next) => {
  Review.findById(req.params.id)
    .populate("comments")
    .then(theReview => {
      res.json(theReview);
    })
    .catch(err => {
      res.json(err);
    });
});
//works
router.get("/withcomments/:id", (req, res, next) => {
  Review.findById(req.params.id)
    .populate("comments")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        model: "User"
      }
    })
    .then(theReview => {
      res.json(theReview);
    })
    .catch(err => {
      res.json(err);
    });
});

//works
router.post("/create", (req, res, next) => {
  Review.create({
    title: req.body.title,
    review: req.body.review,
    rating: req.body.rating,
    user: req.user._id,
    tmdb: req.body.tmdb,
    imdb: req.body.imdb,
    comments: []
  })
    .then(response => {
      // User.findByIdAndUpdate(req.user._id,{ $push: {reviewsMade: response._id}})
      req.user.reviewsMade.push(response._id);

      req.user.save();
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

//works
//this should only change the title review and rating, changing other stuff would not make sense
router.post("/update/:id/", (req, res, next) => {
  const userid = req.user.id;
  console.log("route is there");
  Review.findById(req.params.id).then(theReview1 => {
    const authorid = theReview1.user;
    console.log("first.then");
    if (authorid != userid) {
      res.status(400).json({
        message: "You are not logged in as the author of this review"
      });
      return;
    }
    Review.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      review: req.body.review,
      rating: req.body.rating,
      tmdb: req.body.tmdb
    })
      .then(theReview2 => {
        res.json(theReview2);
        return;
      })
      .catch(err => {
        res.json(err);
      });
  });
});

//works
//make sure to make this a delete request in the angular side as well
router.delete("/delete/:id/", (req, res, next) => {
  Review.findByIdAndRemove(req.params.id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
