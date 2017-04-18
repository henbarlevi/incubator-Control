var express = require('express');
var path = require('path');//help to work with files path
var favicon = require('serve-favicon');//favicon serving middleware with caching (the small icon)
var logger = require('morgan'); // HTTP request logger middleware for node.js
var cookieParser = require('cookie-parser'); //Parse Cookie header and populate req.cookies with an object keyed by the cookie names
var bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
var mongoose = require('mongoose'); // Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
var sessions = require('client-sessions'); //using sessions in order to save loggedin users

var busboy = require('connect-busboy');//File upload TEST

var appRoutes = require('./routes/app'); // exposing the router that handle routing requests
var admin = require('./routes/roles/admin'); //router middleware that handle 'admin' Role requests
var editor = require('./routes/roles/editor'); //router middleware that handle 'editor' Role requests
var watcher = require('./routes/roles/watcher'); //router middleware that handle 'watcher' Role requests
//GOOGLE
var passport = require('passport');

    require('./config/passport')(passport); // pass passport for configuration

var app = express();
mongoose.connect('mongodb://localhost/IncubatorDB');//setting connection to DB


// view engine setup
app.set('views', path.join(__dirname, 'views')); //set for 'views' folder the default location
app.set('view engine', 'hbs');//set hbs as the template engine, by default it will search the .hbs files in the 'views' folder

/*
MiddleWare
*/
app.use(busboy()); //File upload TEST
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); //logger for server operation - TODO stream the log message to somewere 
app.use(bodyParser.json()); // Parses the text as JSON and exposes the resulting object on req.body
app.use(bodyParser.urlencoded({ extended: false }));//Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST) and exposes the resulting object (containing the keys and values) on req.body.
app.use(cookieParser()); // parses cookies and populates req.cookies with objects bidden to cookie names.
app.use(express.static(path.join(__dirname, 'public')));//handle request for static files - client will get all files from the 'public' folder

app.use(sessions({ //using session in order to remember users that already logged in
    cookieName: 'session', //name of the session
    secret: '#@#@@MY_SECRET', // encrypt and decrypt the session by using this secret string (security reasons)
    duration: 30 * 60 * 1000, //time until the session expierd - if the client doesnt send requests for an hour he will be loged out
    activeDuration: 5 * 60 * 1000 // extra time for the experreison of the session each time the user send request
}));
//GOOGLE
//var session = require('express-session');

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false
// }));

app.use(passport.initialize());
// app.use(passport.session());
require('./routes/google-auth')(app,passport);

// //-----------------------------------------
//DEBUG:
app.use('/', function (req, res, next) {
    console.log('request url:' + req.url); //each http req will cause a console.log of the url
    console.log(JSON.stringify(req.method));
    next(); //will continue to handling the request
});
/*
server permission to types of HTTP requests 
*/
// app.use(function (req, res, next) {
//   //  res.setHeader('Access-Control-Allow-Origin', '*'); //accept not authenticated requests
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //headers allowed by the server
//     res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS'); //allow Http 'POST, GET, PATCH, DELETE, OPTIONS' requests
//     next();
// });


app.use('/', appRoutes); //any request goes through the routing rules which are applied in appRoutes
app.use('/editor', editor); //router middleware that handle 'editor' Role requests 
app.use('/admin', admin);//router middleware that handle 'admin' Role requests
app.use('/watcher', watcher); //router middleware that handle 'watcher' Role requests

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;

