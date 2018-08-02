// see account
// update account
//delete account

//currently user password and username cannot be changed.
const express      = require('express');
const router   = express.Router();
const User  =require('../models/user')
const ensureLogin = require('connect-ensure-login');

//view page to edit account 

//updates account
router.post('/updateuser', ensureLogin.ensureLoggedIn(), (req, res, next)=>{
    User.findByIdAndUpdate(req.user._id, {
        avatar: req.body.avatar,
        email: req.body.email,
    })
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err);
    })
})

//deletes the account
router.post('/deleteuser', ensureLogin.ensureLoggedIn(), (req, res, next)=>{
    User.findByIdAndRemove(req.user._id)     
    .then((response)=>{
        res.json(response)
    })
    .catch((err)=>{
        res.json(err);
    })
})

module.exports = router;
