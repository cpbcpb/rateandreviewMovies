const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const reviewSchema = new Schema({
    title: String,
    review: String,
    movie: {type: Schema.Types.ObjectId},
    rating: Number,
    user: {type: Schema.Types.ObjectId},
    comments: [{type: Schema.Types.ObjectId}],
    edited: {type: Boolean, default: false}
},
{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
      //can also just put timestamps: true
    }
  });


const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;