/*SourcesOptions Repository - options of the domain combo box in the project form fields*/
var SourcesOptions = require('../../project-enums').SourcesOptions;


//get all source options
function findAll(callback) {
    SourcesOptions.find({}, callback);
}
//add new source option
function add(optionName, callback) {
    var sourceOption = new SourcesOptions({
        option: optionName
    });
    sourceOption.save(callback);
}
//delete source option
function deleteOption(optionName,callback){
     SourcesOptions.findOneAndRemove({ option: optionName }, callback);
}

//Exports:
module.exports = {
    findAll: findAll,
    add : add,
    deleteOption : deleteOption
}