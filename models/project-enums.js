/*contain in DB all the options of the combo boxes in the project form fields
in order to let the admin change them dynamically by changing 
the values in the DB*/

//relevant to this topic but not in use:
// how toAccess the list of valid values for an Enum field in a Mongoose.js Schema:
//http://stackoverflow.com/questions/10640749/access-the-list-of-valid-values-for-an-enum-field-in-a-mongoose-js-schema

/*the project-enums DB model*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

//source combobox options
var sourcesOptions = new Schema({
    option: { type: String, required: true ,unique:true},
});
sourcesOptions.plugin(mongooseUniqueValidator);
//status combobox options
var statusOptions = new Schema({
    option: { type: String, required: true,unique:true },
});
statusOptions.plugin(mongooseUniqueValidator);
//domian combobox options
var domainOptions = new Schema({
    option: { type: String, required: true,unique:true },
});

domainOptions.plugin(mongooseUniqueValidator);
module.exports = {
    SourcesOptions :mongoose.model('SourcesOptions', sourcesOptions),
    StatusOptions : mongoose.model('StatusOptions', statusOptions),
    DomainOptions :mongoose.model('DomainOptions', domainOptions),
}

