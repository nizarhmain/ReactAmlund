// main server entry point file
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require("cors");           // middleware allows to make requests from a different domain name, can in fact set it up without using this module
const passport = require("passport");
const mongoose = require('mongoose');
const config = require('./config/database');

//connect to database
mongoose.Promise = require('bluebird');
mongoose.connect(config.database);

// on connection to the database
mongoose.connection.on('connected', function(){
    console.log('connected to database' + config.database);
})

//on error
mongoose.connection.on('error', function(err){
    console.log('connected to database' + err);
})

// initialize our app variable with express
const app = express();
const port = 3000;

const users = require('./routes/users');
const articles = require('./routes/articles');

// CORS MIDDLEWARE
app.use(cors());

//set static folder for the front end
app.use(express.static(path.join(__dirname, 'public')));


//router
// body parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);   // route handling for it
app.use('/articles', articles);

// index route
app.get('/', function(req, res){
    res.send('Invalid endpoint');
});

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// start server
app.listen((port), () => {
            console.log("server started on port : " + port );
});

