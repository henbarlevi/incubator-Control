/*reusable methods that get used by the routes folder files (app.js , admin.js etc..)*/
var ProjectRep = require('../models/repositories/project-rep'); //import 'Project' repository
var Member = require('../models/member'); //import 'Member' schema model
var UserRep = require('../models/repositories/user-rep'); //import 'User' schema model
var ProjectFile = require('../models/project-files'); //import 'File' schema model that contain the path and the fieldname of a project's file
var EventRefRep = require('../models/repositories/event-reference-rep');//import 'event-reference' repository
var SourcesOptionsRep = require('../models/repositories/project-enums/source-options-rep');//repository of schema that contain the options in the source 'מקור' comboboxe
var StatusOptionsRep = require('../models/repositories/project-enums/status-options-rep');//repository of schema that contain the options in the status 'סטטוס' comboboxe
var DomainOptionsRep = require('../models/repositories/project-enums/domain-options-rep');//repository of schema that contain the options in the domain 'תחום' comboboxe

var path = require('path');//help with files path
var fs = require('fs'); // load the file system module in order to read/write uploaded files/create folders etc..
var rimraf = require('rimraf'); //module that can delete folder with all its files

//-----------------------------------------------------------------------------
/*method that check user authenticatation by :
1.checking if session exist
2.checking if user on session exist
3.try to pull user from db according to the email and password from session
4.if pull succeeded - saving the user details in req.user
 */
function checkUserAuthentication(req, res, next) {
    if (req.session && req.session.user) {
        var email = req.session.user.email;
        var password = req.session.user.password;
        UserRep.findOneByEmail(email, function (err, user) {
            if (err) { //if error in db happend
                res.status(401).send('Error! : ' + err);
            }
            else if (!user || user.password !== password) { //if user not exist or user password not correct
                res.status(401).send('Error! : invalid email or password1');
            }
            else { //user is authenticated:
                req.user = user;
                req.user.password = null; //delete password from details for security reasons              
                console.log("THE SESSION:" + req.user);//DEBUG
                next();
            }
        });
    } else {
        next();
    }
}
/*check if the user is authenticated - all users that a authenticated saved session have their details attached to req.user by the  checkUserAuthentication*/
function requireLogin(req, res, next) {
    if (!req.user) {
        res.status(401).send('User is not Authenticated, please login');
    }
    next();
}
//---------------------------------------------------------------------------
//------------------------------project functions----------------------------
//---------------------------------------------------------------------------

/*Handle with project POST request*/
function projectPostHandler(req, res, next) {
    console.log('project as been posted:');
    console.log(req.body);
    if (req.body && req.body.project) { //check if project exist in the request boy
        //insert record mongoDB:
        var projectReq = req.body.project; //the project posted
        var eventReferencesReq = req.body.eventReferences;//the eventReferences posted
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
                        if (!err) {

                            console.log('even-ref added');
                        }
                        ProjectRep.pushEventsRef(proj._id, event);
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
    if (projectId) {

        ProjectRep.UpdateById(projectId, req.body,
            function (err, proj) {
                //if (err) return handleError(err);
                if (err) {
                    res.status(502).send('error in DB! ,couldnt find project by id');

                } else {

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
//---------------------------------------------------------------------------
//-------------------------------Project Files Functions---------------------
//---------------------------------------------------------------------------

/*handle with Project related uploaded files : http://stackoverflow.com/questions/23114374/file-uploading-with-express-4-0-req-files-undefined */
function projctUploadedFilesHandler(req, res, next) {
    var projectId = req.params.id;//getting the id paramter from url
    console.log('uploading new project files, id: ' + projectId);//DEBUG
    //check if that project have a folder for files:
    var projectFilesFolder = path.join(__dirname, '/../uploads/', projectId.toString());

    if (!fs.existsSync(projectFilesFolder)) {//if the folder not exist
        res.status(400).send('it seems that this project dosent exist in the server');//bad Request response
    } else {//insert all uploaded file intor the project folder:

        var fstream;
        req.pipe(req.busboy);//pipe request to busboy in order that busboy will get uploaded files from req
        req.busboy.on('file', function (fieldname, file, filename) {//for each uploaded file:
            console.log(file);//DEBUG
            console.log('the field name : %s filename : %s', fieldname, filename);//DEBUG
            console.log("Uploading: " + filename);//DEBUG.
            fstream = fs.createWriteStream(projectFilesFolder + '/' + filename);//create write stream to project folder
            file.pipe(fstream);//pipe the uploaded file into the project folder
            fstream.on('close', function () {
                console.log('File [' + fieldname + '] Finished');
                //save the file path to the DB project files schema:
                ProjectRep.findById(projectId, function (err, project) {
                    if (err) {
                        res.status(502).end('couldnt find project in DB when uploading the files');
                    }
                    else {
                        var projectFile = new ProjectFile({
                            fileName: filename,
                            fieldName: fieldname,
                            project: project._id
                        })
                        projectFile.save(function (err) {
                            if (err) {
                                res.status(502).send('couldnt save the path of the files to DB');
                            }
                        })
                    }
                })
            });
        });
        req.busboy.on('finish', function () {//when finished to insert all uploaded files:
            console.log('Done parsing form files!');
            res.status(201).send('files of project uploaded succefully');
        });
    }

}
/*handle with download project files requests
http://stackoverflow.com/questions/9321027/how-to-send-files-with-node-js
http://stackoverflow.com/questions/25463423/res-sendfile-absolute-path - how to use path to get file path
*/
function projectDownloadFilesHandler(req, res, next) {
    // var path = require('path');
    // res.sendFile(path.join(__dirname, '../../uploads', 'קורות חיים חן  בר לוי 060217.docx'));
    //test:
    var projectId = req.params.id;//getting the id paramter from url
    console.log('sending project files, id: ' + projectId);
    var projectFilesFolder = path.join(__dirname, '../uploads/', projectId.toString());
    var zipFolder = require('zip-folder');

    zipFolder(projectFilesFolder, path.join(__dirname, '../archive.zip'), function (err) {
        if (err) {
            console.log('oh no!', err);
        } else {
            console.log('EXCELLENT');
            res.sendFile(path.join(__dirname, '../archive.zip'));

        }
    });

}

/*handle with download a project specific file (pitchfile/finderfile etc..)*/
function projectDownloadSpecificFileHandler(req, res, next) {
    var projectId = req.params.id;//getting the id paramter from url    
    var fieldname = req.query.fieldname; //contain the query stirng values    
    console.log('params and query string');
    console.log(projectId)
    console.log(fieldname)
    if (projectId && fieldname) { //check if projectid param and fieldname exist
        ProjectFile.findOne({ project: projectId, fieldName: fieldname })
            .exec(function (err, file) {
                if (file) {
                    console.log('the file path:')
                    console.log(file);
                    //sending the requested file:
                    var filePath = path.join(__dirname, '/../uploads/', projectId.toString(), '/', file.fileName);
                    res.sendFile(filePath);
                } else {
                    res.status(400).send('sory that file doesnt exist');
                }
            })
    }
    else {
        res.status(400).send('client didnt send the project id or the file fieldname');
    }
}
//---------------------------------------------------------------------------
//-------------------------------comboboxes options Functions---------------------
//---------------------------------------------------------------------------

/*Handle with GET comboboxes-options request- client want to load the comboboxes options in the project form*/
function comboOptionsGetHandler(req, res, next) {
    SourcesOptionsRep.findAll(function (err, srcOptions) {
        console.log(typeof srcOptions);
        if (err) {
            res.status(502).send('couldnt find options of combobox source')
        }
        else {
            StatusOptionsRep.findAll(function (err, stsOptions) {
                console.log(typeof stsOptions);
                if (err) {
                    res.status(502).send('couldnt find options of combobox status')
                }
                else {
                    DomainOptionsRep.findAll(function (err, dmnOptions) {
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
}

/*Handle with POST new combobox-option request - changing form structure requests - the admin can change the new project form structure
by changing the comboboxes options (combo boxes options are saved in the DB in the 'project-enums.js schemas) */
function comboOptionsPostHandler(req, res, next) {
    console.log(req.params);
    var comboboxName = req.params.comboboxname;//getting the comboboxname paramter from url
    var newOption = req.body.option;// getting the option property from the request body json obj
    if (comboboxName) {
        if (comboboxName === 'status') {
            //add new option to the StatusOptions schema
            StatusOptionsRep.add(newOption, function (err) {
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
            DomainOptionsRep.add(newOption, function (err) {
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
            SourcesOptionsRep.add(newOption, function (err) {
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
}

/*Handle with DELETE comboboxes-options request*/
function comboOptionsDeleteHandler(req, res, next) {
    var comboboxName = req.params.comboboxname;//getting the comboboxname paramter from url
    var queryString = req.query; //contain the query stirng values
    if (comboboxName && queryString.option) {
        if (comboboxName === 'status') {
            StatusOptionsRep.deleteOption(queryString.option, function (err) {
                if (err) {
                    res.status(502).send('couldnt delte the option')
                }
                else {
                    res.status(200).send('option deleted succesfully')
                }
            })
        }
        else if (comboboxName === 'domain') {
            DomainOptionsRep.deleteOption(queryString.option, function (err) {
                if (err) {
                    res.status(502).send('couldnt delte the option')
                }
                else {
                    res.status(200).send('option deleted succesfully')
                }
            })
        }
        else if (comboboxName === 'source') {
            SourcesOptionsRep.deleteOption(queryString.option, function (err) {
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
}

//---------------------------------------------------------------------------
//-------------------------------Users Functions---------------------
//---------------------------------------------------------------------------

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
    requireLogin: requireLogin, /*middleware that fillter unauthenticated users */
    checkUserAuthentication: checkUserAuthentication, /*check if user email and pass are authenticated - if so - save user to session */
    /*project GET,POST,DELETE,PATCH functions*/
    projectPostHandler: projectPostHandler, /*Handle with project POST request*/
    projectGetHandler: projectGetHandler,   /*Handle with project GET request*/
    projectGetByIdHandler: projectGetByIdHandler,
    projectPatchHandler: projectPatchHandler, /*Handle project "Patch" request , modify existing project */
    projectDeleteHandler: projectDeleteHandler, /*Handle project "DELETE" request  */
    /*Project Files Functions*/
    projctUploadedFilesHandler: projctUploadedFilesHandler, /*handle with Project related uploaded files : http://stackoverflow.com/questions/23114374/file-uploading-with-express-4-0-req-files-undefined */
    projectDownloadFilesHandler: projectDownloadFilesHandler, /*handle with download project files requests*/
    projectDownloadSpecificFileHandler: projectDownloadSpecificFileHandler, /*handle with download a project specific file (pitchfile/finderfile etc..)*/
    /**combobox options Functions */
    comboOptionsGetHandler: comboOptionsGetHandler, /*Handle with GET comboboxes-options request- client want to load the comboboxes options in the project form*/
    comboOptionsPostHandler: comboOptionsPostHandler, /*Handle with POST new combobox-option request*/
    comboOptionsDeleteHandler: comboOptionsDeleteHandler, /*Handle with DELETE comboboxes-options request*/
    /*Users functions*/
    usersGetHandler: usersGetHandler, /*Handle with GET users Request*/
    userPostHandler: userPostHandler, /*Handle with POST new user Request*/
    userDeleteHandler: userDeleteHandler, /*Handle with DELETE user Request*/
    userPatchHandler: userPatchHandler /*Handle with PATCH user Request*/
}