/*the business-development that related to a project*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
//declare the Project files table structure TODOD:
var schema = new Schema({
    customerName:{ type: String, required: true },
    startDate:{ type: String},
    endDate:{ type: String},    
    status:{ type: String },
    project: {type: Schema.Types.ObjectId, ref: 'Project'}
});//array fields with mongoose http://stackoverflow.com/questions/26423508/mongoose-assign-field-of-type-array-of-strings

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Business-Dev', schema);