/*Project Events repository*/
var EventRef = require('../event-reference'); //import 'Event-Ref' schema model

//add events records to db:
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
//find all events-refs related to project by id
function findByProjId(projectId,callback){
     EventRef.find({project:projectId}, callback);
}

//delete all events-refs related to projectid and insert new ones (update project array ref)
function reInsertByprojectId(newEvenstRefs,projectId,callback){
        //delete all events by projectid
        EventRef.remove({project:projectId},function(err){
            //add new events with proj id
            if(!err){
                console.log('removed succesfully');
            addMulti(newEvenstRefs,projectId,callback);
            }
        });

}
module.exports = {
    addMulti: addMulti,
    findByProjId:findByProjId,
    reInsertByprojectId : reInsertByprojectId
};