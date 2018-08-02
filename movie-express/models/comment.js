const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const commentSchema = new Schema({
    user: {type: Schema.Types.ObjectId},
    movie: {type: Schema.Types.ObjectId},
    review: {type: Schema.Types.ObjectId},
    comment: String,
    edited: {type: Boolean, default: false},
},
{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
      //can also just put timestamps: true
    }
  }
);


const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;