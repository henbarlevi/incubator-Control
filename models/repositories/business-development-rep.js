/*Project business development repository*/
var BusinessDev = require('../business-development'); //import 'Business-Dev' schema model

//add event record to db:
function addMulti(newBusinessDevs,projectId, callback) {
   newBusinessDevs.forEach((busDev)=>{//create bussiness-dev record foreach busDev

    //creating a eventref record
    var businessDev = new BusinessDev({
        customerName: busDev.customerName,
        startDate: busDev.startDate,
        endDate: busDev.endDate,
        status: busDev.status,
        project:projectId
    });
    //saving the user to db:
    businessDev.save(callback);
   })
}
//find all busdevs related to project by id
function findByProjId(projectId,callback){
     BusinessDev.find({project:projectId}, callback);
}

//delete all busdevs related to projectid and insert new ones (update project array ref)
function reInsertByprojectId(newBusinessDevs,projectId,callback){
        //delete all events by projectid
        BusinessDev.remove({project:projectId},function(err){
            //add new events with proj id
            if(!err){
                console.log('removed succesfully');
            addMulti(newBusinessDevs,projectId,callback);
            }
        });

}
module.exports = {
    addMulti: addMulti,
    findByProjId:findByProjId,
    reInsertByprojectId: reInsertByprojectId
};