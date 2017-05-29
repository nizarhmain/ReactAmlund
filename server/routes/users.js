const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const commonValidations = require('../shared/validations/signup');
const Promise = require('bluebird');
const isEmpty = require('lodash/isEmpty');


function validateUnique(data, otherValidation){
    let { errors } = otherValidation(data);

    return Promise.all([
  /*  Returning the promise */
                User.getUserByUsername(data.username, function(err, user){  
                                if (err) throw err;

                                if(user){
                                        if(user.username === data.username){
                                        errors.username = "this username is already taken";
                                        }
                                }
                                
                            }),

                User.getUserByEmail(data.email, function(err, user){  
                                if (err) throw err;

                                if(user){
                                        if(user.email === data.email){
                                        errors.email = "this email is already taken";
                                    }
                                }
                                
                            })
        ]).then(() => {
            return { 
                errors,
                isValid : isEmpty(errors)
            };
        });
}

// register route
router.post('/register', function(req, res){                     
                                                                     // timeout for the loading screen thing
  validateUnique(req.body, commonValidations.validateInput).then(({errors, isValid}) => {
    if ( isValid ) {
           // we actually add the user to the database
                    //create a new user
                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    passwordConfirmation: req.body.passwordConfirmation,
                });
                // add a check if username and email already exists and throw that erro

                // add function user
                User.addUser(newUser, function(err, user){
                    if(err){
                       res.status(400).json(errors);
                    } else {
                        res.json({success: true });
                    }
                }); 
            } 
  });    // returns isValid and errors
    
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