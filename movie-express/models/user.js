const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default:
        "https://www.writeups.org/wp-content/uploads/Captain-Jean-Luc-Picard-Star-Trek-Patrick-Stewart-a.jpg"
    },
    //remember the id from tmdb is not an objectid
    seenMovies: [String],
    wishlist: [String],
    faveMovies: [String],
    reviewsMade: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    commentsMade: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
      //can also just put timestamps: true
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
