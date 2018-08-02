const express    = require('express');
const authRoutes = express.Router();
const passport   = require('passport');
const bcrypt     = require('bcryptjs');

// user model
const User       = require('../models/user');
//in the model can put requirements for username but in the password we would put a validation in the angular form
//or can add another if under the !username !password if....
authRoutes.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email    =req.body.email;
  
    if (!username || !password) {
        //can also leaveout the status400 and just put res.json ...the status 400 shows a 400 error in terminal
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }
  
    User.findOne({ username }, '_id', (err, foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: 'The username already exists' });
        return;
      }
      if (password.length <7) {
        res.status(400).json({ message: 'Please make your password at least 7 characters.' });
        return;
      }
      const salt     = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
  
      const theUser = new User({
          //can also put username:username,
        username,
        password: hashPass,
        email
      });
  
      theUser.save((err) => {
        if (err) {
          res.status(400).json({ message: 'Something went wrong' });
          return;
        }
//   this automatically logs us in when we signup which is super
        req.login(theUser, (err) => {
          if (err) {
            res.status(500).json({ message: 'Something went wrong' });
            return;
          }
  
          res.status(200).json(req.user);
        });
      });
    });
  });
  authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
      }
      
      if (!theUser) {
        res.status(401).json(failureDetails);
        return;
      }
  
      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong' });
          return;
        }
  
        // We are now logged in (notice req.user)
        res.status(200).json(req.user);
      });
    })(req, res, next);
  });

  authRoutes.post('/logout', (req, res, next) => {
    req.logout();
    res.status(200).json({ message: 'Success' });
  });
//can use this in angular as an if, make quick http request here
//if get back ok then continue if not redirect.  can do this in the middle
//of a function in a component...can do an ngIf in that component...
  authRoutes.get('/loggedin', (req, res, next) => {
    if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
    }
    res.status(403).json({ message: 'Unauthorized' });
  });
////similar to the above except returns a different message
//   authRoutes.get('/private', (req, res, next) => {
//     if (req.isAuthenticated()) {
//       res.json({ message: 'This is a private message' });
//       return;
//     }
  
//     res.status(403).json({ message: 'Unauthorized' });
//   });
module.exports = authRoutes;