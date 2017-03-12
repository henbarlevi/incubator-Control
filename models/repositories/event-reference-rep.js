/*Project Events repository*/
var EventRef = require('../event-reference'); //import 'Event-Ref' schema model

//add event record to db:
function addMulti(newEvenstRefs,projectId, callback) {
   newEvenstRefs.forEach((newEvRef)=>{//create event-ref record foreach eventRef

    //creating a eventref record
    var eventRef = new EventRef({
        name: newEvRef.name,
        startDate: newEvRef.startDate,
        endDate: newEvRef.endDate,
        location: newEvRef.location,
        status: newEvRef.status,
        project:projectId
    });
    //saving the user to db:
    eventRef.save(callback);
   })
}

function findByProjId(projectId,callback){
     EventRef.find({project:projectId}, callback);
}
module.exports = {
    addMulti: addMulti,
    findByProjId:findByProjId
};