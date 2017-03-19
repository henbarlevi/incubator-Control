/*Project Seedaid repository*/
var SeedAid = require('../seed-aid'); //import 'Event-Ref' schema model

//add seedaids records to db:
function addMulti(newSeedAids,projectId, callback) {
   newSeedAids.forEach((newSeedAid)=>{//create seed-aid record foreach seed-aid

    //creating a eventref record
    var seedAid = new SeedAid({
        investmentAmount: newSeedAid.investmentAmount,
        companyValue : newSeedAid.companyValue,
        startDate: newSeedAid.startDate,
        endDate: newSeedAid.endDate,
        eventName: newSeedAid.eventName,
        status: newSeedAid.status,
        result:newSeedAid.result,
        project:projectId
    });
    //saving the user to db:
    seedAid.save(callback);
   })
}

function findByProjId(projectId,callback){
     SeedAid.find({project:projectId}, callback);
}
module.exports = {
    addMulti: addMulti,
    findByProjId:findByProjId
};