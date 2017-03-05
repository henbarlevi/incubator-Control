/*StatusOptions Repository - options of the domain combo box in the project form fields*/
var StatusOptions = require('../../project-enums').StatusOptions;

//get all status options
function findAll(callback) {
    StatusOptions.find({}, callback);
}
//add new status option
function add(optionName, callback) {
    var statusOption = new StatusOptions({
        option: optionName
    });
    statusOption.save(callback);
}
//delete status option
function deleteOption(optionName,callback){
     StatusOptions.findOneAndRemove({ option: optionName }, callback);
}

//Exports:
module.exports = {
    findAll: findAll,
    add : add,
    deleteOption : deleteOption
}