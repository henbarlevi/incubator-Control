var Incubation = require('../incubation'); //import 'Incubation' schema model
/*ADD incubation record to DB: */
function add(incubationReq,projectId, callback) {
    //creating an incubation record
    var incubation = new Incubation({
        verificationAnalysis: incubationReq.verificationAnalysis,
        volunteers:incubationReq.volunteers,
        businessProgram: incubationReq.businessProgram,
        marketingStrategy: incubationReq.marketingStrategy,
        productCharacterization:incubationReq.productCharacterization,
        productDesign: incubationReq.productDesign,
        productDevelopment: incubationReq.productDevelopment,
        poc: incubationReq.poc,
        marketing: incubationReq.marketing,
        project:projectId
    });
    //saving the project to db:
    incubation.save(callback);
}

function findByProjId(projectId,callback){
     Incubation.find({project:projectId}, callback);
}
//delete incubation  related to projectid and insert new one (update project incubation)
function reInsertByprojectId(newIncubation,projectId,callback){
        //delete all seed-aids by projectid
        Incubation.remove({project:projectId},function(err){
            //add new seed-aids with proj id
            if(!err){
                console.log('removed succesfully');
                console.log('the updated incubation');
                console.log(newIncubation);
                
            add(newIncubation,projectId,callback);
            }
        });
}

module.exports = {
    add: add,
    findByProjId:findByProjId,
    reInsertByprojectId : reInsertByprojectId
};