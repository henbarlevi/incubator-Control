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
/*Find projects by id: and populate all its related details - eventsRef, business devlopment etc */
function findById(projectId,callback){
    Project.findById(projectId)
    .populate('eventsReference')
    .populate('businessDevelopment')
    .populate('seedAid')
        .exec(callback);;
}
/*Find projects that their names include the name arg string DB: */
function findByName(name, callback) {
    Project.find({ projectName: { $regex: name, $options: 'i' } },callback);

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

//push event-ref to project model
function pushEventRef(projectId,eventRef){
    Project.findById(projectId,function(err,proj){
        proj.eventsReference.push(eventRef)
        proj.save();
    })
}
//push business-devlopment to project model
function pushBusinessDev(projectId,businessDevelopment){
    Project.findById(projectId,function(err,proj){
        proj.businessDevelopment.push(businessDevelopment)
        proj.save();
    })
}
//push seed-aid to project model
function pushSeedAid(projectId,seedAid){
    Project.findById(projectId,function(err,proj){
        proj.seedAid.push(seedAid)
        proj.save();
    })
}

module.exports = {
    add: add,
    findAll : findAll,
    findById :  findById,
    findByName: findByName,
    findByDomain : findByDomain,
    UpdateById : UpdateById,
    DeleteById :  DeleteById,
    pushEventRef :pushEventRef,
    pushBusinessDev: pushBusinessDev,
    pushSeedAid: pushSeedAid

};