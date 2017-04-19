module.exports = function(app, passport) {


app.get('/auth/google',
    passport.authenticate('google', { scope: ['openid email profile'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Authenticated successfully
        console.log('logged with google succesfully');
        res.redirect('/');
    });


}