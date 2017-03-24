//---------------------------------------------------------------------------
//------------------------------project functions----------------------------
//---------------------------------------------------------------------------
/*project GET,POST,DELETE,PATCH requests Handlers*/

var ProjectRep = require('../models/repositories/project-rep'); //import 'Project' repository
var EventRefRep = require('../models/repositories/event-reference-rep');//import 'event-reference' repository
var businessDevelopmentRep = require('../models/repositories/business-development-rep');//import 'business-development repository
var seedAidRep = require('../models/repositories/seed-aid-rep');//import 'seed-aid repository

var path = require('path');//help with files path
var fs = require('fs'); // load the file system module in order to read/write uploaded files/create folders etc..
var rimraf = require('rimraf'); //module that can delete folder with all its files

/*Handle with project POST request*/
function projectPostHandler(req, res, next) {
    console.log('project as been posted:');
    console.log(req.body);
    if (req.body) { //check if project exist in the request boy
        //insert record mongoDB:
        var projectReq = req.body; //the project posted
        var eventReferencesReq = req.body.eventsReference;//the eventReferences posted
        var busninessDevelopmentReq = req.body.businessDevelopment;//the businessDevelopment posted
        var seedAidReq  =req.body.seedAid; //the seedAid posted
        ProjectRep.add(projectReq, function (err, proj) { //saving new project record
            console.log('the error:');//DEBUG
            console.log(err);
            console.log('the doc');
            console.log(proj);
            if (err) { //if db failed to save the new project
                res.status(400).json({ message: ' project fileds filled uncorrectly' }); //bad request response
            }
            else { //if new project saved in DB
                //create folder for the uploaded files (folder name - project id):
                var dir = path.join(__dirname, '../uploads/', proj._id.toString());
                if (!fs.existsSync(dir)) {//if the foler not exist
                    fs.mkdirSync(dir);//create the folder
                }
                //adding event references to db:
                if (eventReferencesReq) {
                    EventRefRep.addMulti(eventReferencesReq, proj._id, function (err, event) {
                        if (err) {

                        }
                        console.log('even-ref added');
                        ProjectRep.pushEventRef(proj._id, event);
                    })
                }
                //adding business dev to db:
                if (busninessDevelopmentReq) {
                    businessDevelopmentRep.addMulti(busninessDevelopmentReq, proj._id, function (err, busDev) {
                        if (err) {

                        }
                        console.log('busniess-dev added');
                        ProjectRep.pushBusinessDev(proj._id, busDev);
                    })
                }
                //adding seed aid to db:
                if (seedAidReq) {
                    seedAidRep.addMulti(seedAidReq, proj._id, function (err, seedAid) {
                        if (err) {

                        }
                        console.log('busniess-dev added');
                        ProjectRep.pushSeedAid(proj._id, seedAid);
                    })
                }
                res.status(201).json(proj);
            }
        });


    }
    else { //new project doesnt exist in  the request body
        res.status(400).json({ message: ' bad project post' }); //bad request response
    }
}
/*Handle with project GET request*/
function projectGetHandler(req, res, next) {
    console.log('client asking for all projects details, querystring prms:');//DEBUG
    console.log(req.query);
    var queryString = req.query; //contain the query stirng values
    if (queryString.name) {

        ProjectRep.findByName(queryString.name,
            function (err, proj) {
                if (err) return handleError(err);
                console.log(proj);
                console.log('the serach result %s.', proj);
                res.status(200).json({ projects: proj });

            });
    }
    else if (queryString.domain) {
        ProjectRep.findByDomain(queryString.domain,
            function (err, proj) {
                if (err) return handleError(err);
                console.log(proj);
                console.log('the serach result %s.', proj);
                res.status(200).json({ projects: proj });

            });
    }
    else {

        ProjectRep.findAll(function (err, projects) {
            console.log(projects);
            if (err) {
                return res.status(502).send('error in DB!');
            }
            res.status(200).json({ projects: projects });
        });
    }
}
/*Handle with project GET by Id request*/
function projectGetByIdHandler(req, res, next) {
    console.log(req.params.id);
    ProjectRep.findById(req.params.id, function (err, proj) {
        console.log(proj);
        res.status(200).json(proj);
    })
}
/*Handle project "Patch" request , modify existing project */
function projectPatchHandler(req, res, next) {
    var projectId = req.params.id;//getting the id paramter from url
    console.log('project id is ' + req.params.id);//DEBUG
    console.log('project as been patched:');
    console.log(req.body);
    var eventReferences = req.body.eventsReference;
    var businessDevelopment = req.body.businessDevelopment;
    req.body.businessDevelopment = []; //if there is new businessDevelopment they not containing objId - will cause an error when updating project in db - therfore we need to reinsert them manually
    req.body.eventsReference = [];//if there is new eventsrefs they not containing objId - will cause an error when updating project in db - therfore we need to reinsert them manually
    if (projectId) {

        ProjectRep.UpdateById(projectId, req.body,
            function (err, proj) {
                //if (err) return handleError(err);
                if (err) {
                    console.log(err);
                    res.status(502).send('error in DB! ,couldnt find project by id');

                } else {
                    EventRefRep.reInsertByprojectId(eventReferences, proj._id, (err, event) => {
                        ProjectRep.pushEventRef(proj._id, event);
                    })
                    businessDevelopmentRep.reInsertByprojectId(businessDevelopment, proj._id, (err, busDev) => {
                        ProjectRep.pushBusinessDev(proj._id, busDev);
                    })
                    console.log(proj);
                    console.log('the update result %s.', proj);
                    res.status(200).json(proj);
                }
            });
    } else {
        //response 400 Bad Request
        return res.status(400).send('client didnt send projectid as parameter in the url');
    }
}
/*Handle project "DELETE" request  */
function projectDeleteHandler(req, res, next) {
    var projectId = req.params.id;//getting the id paramter from url
    console.log('project id is ' + req.params.id + ' , and trying to delete it');//DEBUG
    if (projectId) {

        ProjectRep.DeleteById(projectId,
            function (err, proj) {
                //if (err) return handleError(err);
                if (err) {
                    res.status(502).send('couldnt find that project in db')
                } else {

                    console.log(proj);
                    console.log('the delete result %s.', proj);
                    //deleting project files folder:
                    var projectDir = path.join(__dirname, '../uploads/', proj._id.toString());
                    rimraf(projectDir, function () {
                        console.log('project folder deleted');
                        res.status(200).json(proj);
                    });
                }
            });
    } else {
        //response 400 Bad Request
        return res.status(400).send('client didnt send projectid as parameter in the url');
    }
}
//project autocomplete name Handler: - returns an array of matched project names to the name querystring
function projectAutoCompleteHandler(req, res, next) {
    console.log('TESTSSSSS');
    var name = req.query.name;
    if (name) {
        ProjectRep.findByName(name, (err, projs) => {
            //getting array that contian the projects names:
         var  projectNamesArr = projs.map(function (p) {
                return p.projectName;
            });

        console.log(projectNamesArr);
        res.status(200).json(projectNamesArr);
        
     })
    }
    else{
        res.status(400).send('client didnt specify a search querystring parameter');
    }
    
}
//-----------------------------------EXPORT---------------------------------
module.exports = {
    /*project GET,POST,DELETE,PATCH functions*/
    projectPostHandler: projectPostHandler, /*Handle with project POST request*/
    projectGetHandler: projectGetHandler,   /*Handle with project GET request*/
    projectGetByIdHandler: projectGetByIdHandler, /*Handle with project GET by Id request*/
    projectPatchHandler: projectPatchHandler, /*Handle project "Patch" request , modify existing project */
    projectDeleteHandler: projectDeleteHandler, /*Handle project "DELETE" request  */
    projectAutoCompleteHandler : projectAutoCompleteHandler
}