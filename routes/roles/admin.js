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
//project methods:
var projectPostHandler = methods.projectPostHandler; /*Handle with project POST request*/
var projectGetHandler = methods.projectGetHandler; /*Handle with project GET request*/
var projectGetByIdHandler = methods.projectGetByIdHandler;/*Handle with project GET request with :id param*/
var projectPatchHandler = methods.projectPatchHandler; /*Handle project "Patch" request , modify existing project */
var projectDeleteHandler = methods.projectDeleteHandler; /*Handle project "DELETE" request  */
//files methods:
var projctUploadedFilesHandler = methods.projctUploadedFilesHandler; /*handle with Project related uploaded files : http://stackoverflow.com/questions/23114374/file-uploading-with-express-4-0-req-files-undefined */
var projectDownloadFilesHandler = methods.projectDownloadFilesHandler;
var projectDownloadSpecificFileHandler = methods.projectDownloadSpecificFileHandler;/*handle with download a project specific file (pitchfile/finderfile etc..)*/
//combo-box methods
var comboOptionsPostHandler = methods.comboOptionsPostHandler; /*Handle with POST new combobox-option request*/
var comboOptionsDeleteHandler = methods.comboOptionsDeleteHandler; /*Handle with DELETE comboboxes-options request*/   
var comboOptionsGetHandler = methods.comboOptionsGetHandler; /*Handle with GET comboboxes-options request- client want to load the comboboxes options in the project form*/
//user methods:
var usersGetHandler = methods.usersGetHandler; /*Handle with GET users Request*/
var userPostHandler = methods.userPostHandler; /*Handle with POST new user Request*/
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
router.post('/add-user',userPostHandler );
/*Handle with DELETE user Request*/
router.delete('/user/:id',userDeleteHandler);
/*Handle user "Patch" request , modify existing user */
router.patch('/user/:id', userPatchHandler);

/*Handle Project "POST" requests */
router.post('/project', projectPostHandler);
/*Handle project "GET" request (asking for all projects/projects by name) */
router.get('/project', projectGetHandler);
//-----------------------
router.get('/project/:id',projectGetByIdHandler);
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
router.get('/comboboxes-options', comboOptionsGetHandler);
/*Handle with POST comboboxes-options request - changing form structure requests - the admin can change the new project form structure
by changing the comboboxes options (combo boxes options are saved in the DB in the 'project-enums.js schemas) */
router.post('/comboboxes-options/:comboboxname', comboOptionsPostHandler);
/*Handle with DELETE comboboxes-options request*/
router.delete('/comboboxes-options/:comboboxname',comboOptionsDeleteHandler);
module.exports = router; //export the router to be used in the app.js 
