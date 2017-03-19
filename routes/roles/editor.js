/*Middleware that handle editor requests (http://localhost:3000/editor)*/
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

var methods = require('../../helpers/methods.js') //contain a resuable Middlewares and other functions (requireLogin etc..)
var requireLogin = methods.requireLogin; //Middleware that filters unauthenticated users
var projectPostHandler = methods.projectPostHandler; /*Handle with project POST request*/
var projectGetHandler = methods.projectGetHandler; /*Handle with project GET request*/
var projectPatchHandler = methods.projectPatchHandler; /*Handle project "Patch" request , modify existing project */
var projectDeleteHandler = methods.projectDeleteHandler; /*Handle project "DELETE" request  */
var projctUploadedFilesHandler = methods.projctUploadedFilesHandler; /*handle with Project related uploaded files : http://stackoverflow.com/questions/23114374/file-uploading-with-express-4-0-req-files-undefined */
var projectDownloadFilesHandler = methods.projectDownloadFilesHandler;
var comboOptionsGetHandler = methods.comboOptionsGetHandler; /*Handle with GET comboboxes-options request- client want to load the comboboxes options in the project form*/
/*Middleware that filter users that are not Authorized (not authenticated or not in 'editor' role)*/
router.use('/',requireLogin, function (req, res, next) { 
    console.log('session in editor' + req.user.role); //DEBUG
    if ((!req.user) ||(req.user.role !== 'editor')) {
        res.status(401).send('User is not Authenticated, please login');
    }   
    else {
        next();
    }
});

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

/*Handle with GET comboboxes-options request- client want to load the comboboxes options in the project form*/
router.get('/comboboxes-options', comboOptionsGetHandler);
module.exports = router; //export the router to be used in the app.js router(./routes/app.js) 
