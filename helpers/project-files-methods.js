//---------------------------------------------------------------------------
//-------------------------------Project Files Functions---------------------
//---------------------------------------------------------------------------
//handling with upload and download files Requests

var path = require('path');//help with files path
var fs = require('fs'); // load the file system module in order to read/write uploaded files/create folders etc..

var ProjectFile = require('../models/project-files'); //import 'File' schema model that contain the path and the fieldname of a project's file
var ProjectRep = require('../models/repositories/project-rep'); //import 'Project' repository

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

//-----------------------------------EXPORT---------------------------------
module.exports = {
  /*Project Files Functions*/
    projctUploadedFilesHandler: projctUploadedFilesHandler, /*handle with Project related uploaded files : http://stackoverflow.com/questions/23114374/file-uploading-with-express-4-0-req-files-undefined */
    projectDownloadFilesHandler: projectDownloadFilesHandler, /*handle with download project files requests*/
    projectDownloadSpecificFileHandler: projectDownloadSpecificFileHandler, /*handle with download a project specific file (pitchfile/finderfile etc..)*/
}