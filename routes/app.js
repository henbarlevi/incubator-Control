/*
handle routing rules of the app
-all the request except static files handled(or at least go through) by this module
*/
var express = require('express'); //import express
var router = express.Router(); //use router module
var User = require('../models/user'); //import 'User' schema model


//handle the root request - send back the angular app (views/index.hbs(html))
router.get('/', function (req, res, next) {
    res.render('index'); //send the angular2 app
});
/*Handle Login Requests  - check if they correct and if so - save the user to session*/
router.post('/login', function (req, res, next) {
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;
    console.log(email);
    User.findOne({ email: email }, function (err, user) {
        console.log(user);
        if (!user) {
            res.status(401).send('Error! : invalid email or password');
        }
        else if (err) {
            res.status(401).send('Error! : ' + err);
        } else if (user.password !== password) {
            res.status(401).send('Error! : invalid email or password');
        }
        else { //email and password are ok
            req.session.user = user; //save the user verification in a session           
            res.status(200).json({ userDetails:  user });//DEBUG - DELTE THE password before sending 
        }
    });
});
/*Handle Login get request - in order to let people that already logged skip the login form
the response is true/false if the user already loggedin and a relevant user details like role and name
*/
router.get('/login', function (req, res, next) {
    if(req.session && req.session.user){ //the user session saved in the req.user
        //sending relevant  user details:
        var user = Object.assign({}, req.session.user); //copy session to new object
        user.password = null;
         res.status(200).json({ loggedin: true ,user:user});
    }
    //if session not exist the user is not loggedin:
    res.status(200).json({ loggedin: false }); //send ok as response
    
});
/*Handle Logout Requests*/
router.post('/logout', function (req, res, next) {
    req.session.reset(); //delete the user session
    res.status(200).json({ message: 'logged out succesfully' }); //send ok as response
    //res.redirect('/');
});


/*Middleware that filter unauthenticated users
From here and on - all requests require Authentication,
 therefore we implement Middleware that filter unauthenticated users:*/
router.use(function (req, res, next) {
    if (req.session && req.session.user) {
        var email = req.session.user.email;
        var password = req.session.user.password;
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                res.status(401).send('Error! : ' + err);
            }
            else if (!user) { //if user not exist
                res.status(401).send('Error! : invalid email or password1');
            } else if (user.password !== password) {
                res.status(401).send('Error! : invalid email or password2');
            }
            else{ //user is authenticated:
                req.user = user;
                req.user.password = null; //delete password from session for security reasons 
                console.log('-------------------USER SESSION INFO----------------------------');             
                console.log("THE SESSION:" +req.user);//DEBUG
                console.log('----------------------------------------------------------------');
                next();
            }
        });
    }else{
       next();
    }
});

router.get('/role',requireLogin, function (req, res, next) {
       
        res.status(200).json({ role: req.user.role });
});


function requireLogin(req,res,next){
    if(!req.user){
        res.status(401).send('User is not Authenticated, please login');
    }
    next();
}

router.get('/test',requireLogin, function (req, res, next) {
     res.status(200).json({ message: 'request got throw middleware authentication' });
});


module.exports = router;

