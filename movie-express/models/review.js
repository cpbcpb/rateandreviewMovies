const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/user");

const reviewSchema = new Schema(
  {
    title: String,
    review: String,
    //object id isn't working with omdb ids
    imdb: String,
    tmdb: { type: String, required: true },
    rating: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    edited: { type: Boolean, default: false }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
      //can also just put timestamps: true
    }
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
