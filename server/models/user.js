const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true},
    password: {type: String, required: true},
    passwordConfirmation: {type: String, required: true},
    erAdmin: {type: Boolean}
});

// UserSchema.plugin(uniqueValidator,  { message: 'Error, expected {PATH} to be unique.' });

const User = module.exports = mongoose.model('User', UserSchema);

// get user by id
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query,callback);
};

module.exports.getUserByEmail = function(email, callback){
    const query = {email: email};
    User.findOne(query,callback);
};

module.exports.addUser = function(newUser, callback){
    // hash the password passed here
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            if(err){
                throw err;
            }
                newUser.password = hash;
                newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if(err) throw err;
            callback(null, isMatch);
    });
};
