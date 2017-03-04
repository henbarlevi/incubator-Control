var Project = require('../project'); //import 'Project' schema model
/*ADD project record to DB: */
function add(projectReq, callback) {
    //creating a project record
    var project = new Project({
        projectName: projectReq.projectName,
        source: projectReq.source,
        petitionDate: projectReq.petitionDate,
        crew: projectReq.crew,
        status: projectReq.status,
        projectDomain: projectReq.projectDomain, //TODO should be get multi vals
        filledPitch: projectReq.filledPitch,
        filledQuestions: projectReq.filledQuestions,
        signedFinder: projectReq.signedFinder,
        programSuggested: projectReq.programSuggested
    });
    //saving the project to db:
    project.save(callback);
}
/*Find all projects */
function findAll(callback){
 Project.find({}, callback);
}

/*Find projects that their names include the name arg string DB: */
function findByName(name, callback) {
    Project.find({ projectName: { $regex: name, $options: 'i' } },
        callback);
}

/*Find projects that their domain include the domain arg string DB: */
function findByDomain(domain, callback) {
    Project.find({ projectDomain: { $regex: domain, $options: 'i' } },
        callback);
}

/*Update project by id */
function UpdateById(projectId, project, callback) {
    Project.findByIdAndUpdate(projectId, { $set: project },
        callback);
}
/*Delete project by id */
function DeleteById(projectId, callback) {
    Project.findByIdAndRemove(projectId, 
        callback);
}

module.exports = {
    add: add,
    findAll : findAll,
    findByName: findByName,
    findByDomain : findByDomain,
    UpdateById : UpdateById,
    DeleteById :  DeleteById

};