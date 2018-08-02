const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type:String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
  required: true,
  unique: true,
  },
  password: {
    type: String,
  required: true,
  },
avatar: {
  type: String,
  default: "https://www.writeups.org/wp-content/uploads/Captain-Jean-Luc-Picard-Star-Trek-Patrick-Stewart-a.jpg",
},
wishlist: [{type: Schema.Types.ObjectId}],
faveMovies: [{type: Schema.Types.ObjectId}],
reviewsMade: [{type: Schema.Types.ObjectId}],
commentsMade: [{type: Schema.Types.ObjectId}]
}, 

{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    //can also just put timestamps: true
  }
}
);

const User = mongoose.model('User', userSchema);
module.exports = User;