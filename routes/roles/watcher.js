/*Middleware that handle watcher requests (http://localhost:3000/watcher)*/
var express = require('express'); //import express
var router = express.Router(); //use router module

/*Middleware that filter users that are not Authorized (not authenticated or not in 'watcher' role)*/
router.use(function (req, res, next) { 
    console.log('session in admin' + req.user.role); //DEBUG
    if ((!req.user) ||(req.user.role !== 'watcher')) {
        res.status(401).send('User is not Authenticated, please login');
    }   
    else {
        next();
    }
});

module.exports = router; //export the router to be used in the app.js router(./routes/app.js) 