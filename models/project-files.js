/*contain in DB all the files paths that related to each project (pitch file, finder file etc..)*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
//declare the Project files table structure TODOD:
var schema = new Schema({
    fileName:{ type: String, required: true },
    fieldName:{ type: String, required: true },
    project: {type: Schema.Types.ObjectId, ref: 'Project'}
});//array fields with mongoose http://stackoverflow.com/questions/26423508/mongoose-assign-field-of-type-array-of-strings

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('File', schema);