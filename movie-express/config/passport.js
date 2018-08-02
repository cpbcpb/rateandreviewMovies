//in previous example this stuff was in app js.

const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/user');
const bcrypt        = require('bcryptjs');


//can also define a function and export it at the bottom, both ways are good.
module.exports = function (passport) {

  passport.use(new LocalStrategy((username, password, next) => {
      //these things expect req.body.username and req.body.password so
      //forms still need to have this
    User.findOne({ username }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

      if (!foundUser) {
        next(null, false, { message: 'Incorrect username' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: 'Incorrect password' });
        return;
      }

      next(null, foundUser);
    });
  }));

  passport.serializeUser((loggedInUser, cb) => {
    cb(null, loggedInUser._id);
  });

  passport.deserializeUser((userIdFromSession, cb) => {
    User.findById(userIdFromSession, (err, userDocument) => {
      if (err) {
        cb(err);
        return;
      }

      cb(null, userDocument);
    });
  });

}