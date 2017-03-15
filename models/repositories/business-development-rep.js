/*Project business development repository*/
var BusinessDev = require('../business-development'); //import 'Business-Dev' schema model

//add event record to db:
function addMulti(newBusinessDevs,projectId, callback) {
   newBusinessDevs.forEach((busDev)=>{//create event-ref record foreach eventRef

    //creating a eventref record
    var businessDev = new BusinessDev({
        customerName: busDev.customerName,
        startDate: busDev.startDate,
        endDate: busDev.endDate,
        status: busDev.status,
        project:projectId
    });
    //saving the user to db:
    eventRef.save(callback);
   })
}

function findByProjId(projectId,callback){
     BusinessDev.find({project:projectId}, callback);
}
module.exports = {
    addMulti: addMulti,
    findByProjId:findByProjId
};