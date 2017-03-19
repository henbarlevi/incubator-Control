//---------------------------------------------------------------------------
//-------------------------------Users Functions---------------------
//---------------------------------------------------------------------------
/*User GET,POST,DELETE,PATCH request handlers*/

var UserRep = require('../models/repositories/user-rep'); //import 'User' schema model

/*Handle with GET users Request*/
function usersGetHandler(req, res, next) {
    console.log('client get users');//DEBUG
    UserRep.findAllExceptAdmin(function (err, users) { //get all users records except users with the 'role' 'admin'
        if (err) {
            res.status(502).send('couldnt find users records');
        } else {

            res.status(200).json({ users: users });
        }
    })
}
/*Handle with POST new user Request*/
function userPostHandler(req, res, next) {

    UserRep.add(req.body, function (err) {
        if (err) {//if error acquired
            let error;
            console.log(err.code);
            if (err.code === 11000) { //11000 - the email input is already exist in DB
                error = 'this email is already taken';//TODO NOT WORKING the user never get that error
            } else {
                error = 'user fields didnt filled correctly , try again';
            }
            res.status(400).send(error);//bad request
        } else {
            res.status(201).send('user created')
        }
    });
}
/*Handle with DELETE user Request*/
function userDeleteHandler(req, res, next) {
    var userId = req.params.id;//getting the id paramter from url
    console.log('user id is ' + req.params.id + ' , and trying to delete it');//DEBUG
    if (userId) {

        UserRep.deleteById(userId,
            function (err, user) {
                //if (err) return handleError(err);
                if (err) {
                    res.status(502).send('couldnt find that user in db')
                } else {
                    console.log('the delete result %s.', user);
                    res.status(200).json(user);
                }
            });
    } else {
        //response 400 Bad Request
        return res.status(400).send('client didnt send projectid as parameter in the url');
    }
}
/*Handle with PATCH user Request*/
function userPatchHandler(req, res, next) {
    var userId = req.params.id;//getting the id paramter from url
    console.log('user id is ' + req.params.id);//DEBUG
    console.log('trying to update user..');
    if (userId) {

        UserRep.updateById(userId, req.body,
            function (err, user) {
                //if (err) return handleError(err);
                if (err) {
                    res.status(502).send('error in DB! ,couldnt find user by id');
                } else {
                    console.log(user);
                    console.log('the update result %s.', user);
                    res.status(200).json(user);
                }
            });
    } else {
        //response 400 Bad Request
        return res.status(400).send('client didnt send user id as parameter in the url');
    }
}

//-----------------------------------EXPORT---------------------------------
module.exports = {
 /*Users functions*/
    usersGetHandler: usersGetHandler, /*Handle with GET users Request*/
    userPostHandler: userPostHandler, /*Handle with POST new user Request*/
    userDeleteHandler: userDeleteHandler, /*Handle with DELETE user Request*/
    userPatchHandler: userPatchHandler /*Handle with PATCH user Request*/
}