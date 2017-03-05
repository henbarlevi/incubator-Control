/*DomainOptions Repository - options of the domain combo box in the project form fields*/

var DomainOptions = require('../../project-enums').DomainOptions;
//get all domain options
function findAll(callback) {
    DomainOptions.find({}, callback);
}
//add new domain option
function add(optionName, callback) {
    var domainOption = new DomainOptions({
        option: optionName
    });
    domainOption.save(callback);
}
//delete domain option
function deleteOption(optionName,callback){
     DomainOptions.findOneAndRemove({ option: optionName }, callback);
}

//Exports:
module.exports = {
    findAll: findAll,
    add : add,
    deleteOption : deleteOption
}