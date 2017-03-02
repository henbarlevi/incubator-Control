/*Middleware that handle admin requests (http://localhost:3000/admin)*/

var express = require('express'); //import express
var router = express.Router(); //use router module

var Project = require('../../models/project'); //import 'Project' schema model
var Member = require('../../models/member'); //import 'Member' schema model
var User = require('../../models/user'); //import 'User' schema model
var comboboxesModels = require('../../models/project-enums');//import all comboboxes options schema models - each schema contain the options in one of the comboboxes in the project form
var SourcesOptions = comboboxesModels.SourcesOptions; //schema that contain the options in the source 'מקור' comboboxe
var StatusOptions = comboboxesModels.StatusOptions;//schema that contain the options in the status 'סטטוס' comboboxe
var DomainOptions = comboboxesModels.DomainOptions;//schema that contain the options in the domain 'תחום' comboboxe


var fs = require('fs'); // load the file system module in order to read/write uploaded files/create folders etc..
var path = require('path');//help with files path

var methods = require('../methods.js') //contain a resuable Middlewares and other functions (requireLogin etc..)
var requireLogin = methods.requireLogin; //Middleware that filters unauthenticated users
var projectPostHandler = methods.projectPostHandler; /*Handle with project POST request*/
var projectGetHandler = methods.projectGetHandler; /*Handle with project GET request*/
var projectPatchHandler = methods.projectPatchHandler; /*Handle project "Patch" request , modify existing project */
var projectDeleteHandler = methods.projectDeleteHandler; /*Handle project "DELETE" request  */
var projctUploadedFilesHandler = methods.projctUploadedFilesHandler; /*handle with Project related uploaded files : http://stackoverflow.com/questions/23114374/file-uploading-with-express-4-0-req-files-undefined */
var projectDownloadFilesHandler = methods.projectDownloadFilesHandler;
var projectDownloadSpecificFileHandler = methods.projectDownloadSpecificFileHandler;/*handle with download a project specific file (pitchfile/finderfile etc..)*/
var usersGetHandler = methods.usersGetHandler; /*Handle with GET users Request*/
var userDeleteHandler = methods.userDeleteHandler;  /*Handle with DELETE user Request*/
var userPatchHandler = methods.userPatchHandler; /*Handle with PATCH user Request*/
/*Middleware that filter users that are not Authorized (not authenticated or not in 'admin' role)*/
router.use('/', requireLogin, function (req, res, next) {
    if ((!req.user) || (req.user.role !== 'admin')) {
        res.status(401).send('User is not Autorized as admin, please login');
    }
    else {
        next();
    }
});

/*Handle with GET users requests*/
router.get('/users',usersGetHandler);
/*Handle add-user "POST" requests - when admin want to create new watcher/editor users */
router.post('/add-user', function (req, res, next) {

    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
    });
    user.save(function (err) {
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
});
/*Handle with DELETE user Request*/
router.delete('/user/:id',userDeleteHandler);
/*Handle user "Patch" request , modify existing user */
router.patch('/user/:id', userPatchHandler);

/*Handle Project "POST" requests */
router.post('/project', projectPostHandler);
/*Handle project "GET" request (asking for all projects/projects by name) */
router.get('/project', projectGetHandler);
/*Handle project "Patch" request , modify existing project */
router.patch('/project/:id', projectPatchHandler);
/*Handle project "DELETE" request  */
router.delete('/project/:id', projectDeleteHandler)

/*handle with uploaded files : http://stackoverflow.com/questions/23114374/file-uploading-with-express-4-0-req-files-undefined */
router.post('/project/uploadfile/:id', projctUploadedFilesHandler); //id - project id
/*handle with download project files requests
http://stackoverflow.com/questions/9321027/how-to-send-files-with-node-js
http://stackoverflow.com/questions/25463423/res-sendfile-absolute-path - how to use path to get file path
*/
router.get('/project/download/:id', projectDownloadFilesHandler);// id - project id
/*handle with download a project specific file (pitchfile/finderfile etc..)*/
router.get('/project/file/:id',projectDownloadSpecificFileHandler);


/*Handle with GET comboboxes-options request- client want to load the comboboxes options in the project form*/
router.get('/comboboxes-options', function (req, res) {
    SourcesOptions.find({}, function (err, srcOptions) {
        console.log(typeof srcOptions);
        if (err) {
            res.status(502).send('couldnt find options of combobox source')
        }
        else {
            StatusOptions.find({}, function (err, stsOptions) {
                console.log(typeof stsOptions);
                if (err) {
                    res.status(502).send('couldnt find options of combobox status')
                }
                else {
                    DomainOptions.find({}, function (err, dmnOptions) {
                        console.log(typeof srcOptions);
                        if (err) {
                            res.status(502).send('couldnt find options of combobox domain')
                        }
                        else {
                            res.status(200).json({ SourcesOptions: srcOptions, StatusOptions: stsOptions, DomainOptions: dmnOptions });
                        }
                    })
                }
            })
        }
    })
})
/*Handle with POST comboboxes-options request - changing form structure requests - the admin can change the new project form structure
by changing the comboboxes options (combo boxes options are saved in the DB in the 'project-enums.js schemas) */
router.post('/comboboxes-options/:comboboxname', function (req, res) {
    console.log(req.params);
    var comboboxName = req.params.comboboxname;//getting the comboboxname paramter from url
    var newOption = req.body.option;// getting the option property from the request body json obj
    if (comboboxName) {
        if (comboboxName === 'status') {
            //add new option to the StatusOptions schema
            var statusOption = new StatusOptions({
                option: newOption
            })
            statusOption.save(function (err) {
                if (err) {//didnt add the new option to DB
                    res.status(502).send('error in DB! ,couldnt save new option'); //gateway error response
                }
                else {//no errors with DB
                    res.status(201).json({ message: 'new option added' }); //OK option added
                }
            })
        }
        else if (comboboxName === 'domain') {
            //add new option to the DomainOptions schema
            var domainOption = new DomainOptions({
                option: newOption
            })
            domainOption.save(function (err) {
                if (err) {//didnt add the new option to DB
                    res.status(502).send('error in DB! ,couldnt save new option'); //gateway error response
                }
                else {//no errors with DB
                    res.status(201).json({ message: 'new option added' }); //OK option added
                }
            })
        }
        else if (comboboxName === 'source') {
            //add new option to the SourcesOptions schema           
            var sourceOption = new SourcesOptions({
                option: newOption
            })
            sourceOption.save(function (err) {
                if (err) {//didnt add the new option to DB
                    res.status(502).send('error in DB! ,couldnt save new option'); //gateway error response
                }
                else {//no errors with DB
                    res.status(201).json({ message: 'new option added' }); //OK option added
                }
            })
        }
        else {
            res.status(400).send('client didnt send a proper comboboxname as parameter in the url');

        }

    } else {
        //response 400 Bad Request
        res.status(400).send('client didnt send comboboxname as parameter in the url');
    }
});
/*Handle with DELETE comboboxes-options request*/
router.delete('/comboboxes-options/:comboboxname', function (req, res) {
    var comboboxName = req.params.comboboxname;//getting the comboboxname paramter from url
    var queryString = req.query; //contain the query stirng values
    if (comboboxName && queryString.option) {
        if (comboboxName === 'status') {
            StatusOptions.findOneAndRemove({ option: queryString.option }, function (err) {
                if (err) {
                    res.status(502).send('couldnt delte the option')
                }
                else {
                    res.status(200).send('option deleted succesfully')
                }
            })
        }
        else if (comboboxName === 'domain') {
            DomainOptions.findOneAndRemove({ option: queryString.option }, function (err) {
                if (err) {
                    res.status(502).send('couldnt delte the option')
                }
                else {
                    res.status(200).send('option deleted succesfully')
                }
            })
        }
        else if (comboboxName === 'source') {
            SourcesOptions.findOneAndRemove({ option: queryString.option }, function (err) {
                if (err) {
                    res.status(502).send('couldnt delte the option')
                }
                else {
                    res.status(200).send('option deleted succesfully')
                }
            })
        }
        else {
            res.status(400).send('bad request : comboboxname doesnt contain valid value')

        }
    } else {
        res.status(400).send('bad request : request doesnt contain the option in or the comboboxname')
    }
});
module.exports = router; //export the router to be used in the app.js 
