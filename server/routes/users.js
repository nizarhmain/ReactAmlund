const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const validation = require('../shared/validations/signup');

// register route
router.post('/register', function(req, res, next){
    setTimeout(function() {                                        // timeout for the loading screen thing
const { errors, isValid } = validation.validateInput(req.body);    // returns isValid and errors
    
    if(!isValid){
        res.status(400).json(errors);
    } else {
                    // we actually add the user to the database
                    //create a new user
                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    passwordConfirmation: req.body.passwordConfirmation,
                });
                // compare the passwords
                
                // add function user
                User.addUser(newUser, function(err, user){
                    if(err){
                        res.json({success: false })
                    } else {
                        res.json({success: true })
                    }
                }); 
    }

    }, 1000);
    
});

// authentication route
router.post('/authenticate', function(req, res, next){
    const username = req.body.username;
    const password = req.body.password;
    
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, msg:'user not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: { id: user._id, name: user.name, username: user.username, email: user.email}
                })
            } else {
                return res.json({success: false, msg: 'wrong password'});
            }
        });
    });

});

// profile route
router.get('/profile', passport.authenticate('jwt', {session: false}), function(req, res, next){
    res.json({user: req.user});
});




module.exports = router;