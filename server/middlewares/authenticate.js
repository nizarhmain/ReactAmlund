const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

module.exports.authenticate = function(req, res, next) {

       const authorizationHeader = req.headers['authorization'];
       let token;   // by default undefinedm if we have then

       if ( authorizationHeader){
        // split it by space cuz we have the word bearer in it and then we
        // take the second element in the array
        token = authorizationHeader.split(' ')[1];
       }

       if(token){
            jwt.verify(token, config.secret, (err, decoded) => {
                // if the token is invalid
                if(err){
                    res.status(401).json({ error : 'Failed to authenticate'});
                } else {
                  User.getUserById(decoded._doc._id, (err, user) => {
                       if(err) throw err;

                       if(user){
                        // this is a valid user filter and output for the author thing
                        req.currentUser = {
                          'name' : user.name,
                          'email' : user.email,
                          'username' : user.username
                        };
                        next();
                       }


                   });
                   
                }
            });
       } else {
        res.status(403).json({
            error: 'No token provided'
        })
       }
    }