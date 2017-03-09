/*Project Events repository*/
var EventRef = require('../event-reference'); //import 'Event-Ref' schema model

//add event record to db:
function addMulti(newEvenstRefs,projectId, callback) {
    //creating a user record
    var eventRef = new EventRef({
        name: newEvenstRefs[0].name,
        startDate: newEvenstRefs[0].startDate,
        endDate: newEvenstRefs[0].endDate,
        location: newEvenstRefs[0].location,
        status: newEvenstRefs[0].status,
        project:projectId
    });
    //saving the user to db:
    eventRef.save(callback);
}

function findByProjId(projectId,callback){
     EventRef.find({project:projectId}, callback);
}
module.exports = {
    addMulti: addMulti,
    findByProjId:findByProjId
};