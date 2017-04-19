//https://c9.io/barberboy/passport-google-oauth2-example
//https://github.com/scotch-io/easy-node-authentication


var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var authConfig = require('./auth');
var User = require('../models/user');
module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        // done(null, user.id);
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        // Users.findById(obj, done);
        done(null, obj);
    });
    passport.use(new GoogleStrategy({

        // Use the API access settings stored in ./config/auth.json. You must create
        // an OAuth 2 client ID and secret at: https://console.developers.google.com
        clientID: authConfig.google.clientID,
        clientSecret: authConfig.google.clientSecret,
        callbackURL: authConfig.google.callbackURL,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
        function (req, token, refreshToken, profile, done) {

            // Typically you would query the database to find the user record
            // associated with this Google profile, then pass that object to the `done`
            // callback.
            console.log(profile.emails[0].value);
            // console.log(req);

            // check if the user is already logged in
            if (req.session && req.session.user) { //user already loggedin
                console.log('user already logged in');
                return done(null, req.session.user);
            }
            else { //not loggedin
                let email = profile.emails[0].value;
                User.findOne({ email: email }, function (err, user) {
                    if (err)
                        return done(err);
                    else if (user) {//if user exist in db- update the token and save him to session
                        console.log('user saved to session', user);
                        //update user to current token:
                        user.token = token;
                        user.save(function (err) {
                            if (err)
                                return done(err);
                            req.session.user = user;//save user to session
                            return done(null, user);
                        });

                    }
                    else { //user not exist in db = new user
                        console.log('user is not exist, creating new user');
                        console.log();

                        var newUser = new User();
                        newUser.name = profile.displayName;
                        newUser.token = token;
                        newUser.email = email;
                        newUser.role = 'watcher';
                        console.log(newUser);
                        newUser.save(function (err) {
                            if (err)
                                return done(err);
                            req.session.user = newUser;//save new user to session    
                            return done(null, newUser);
                        });

                    }
                });
            }
        }
    ));

}