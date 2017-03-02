/*CURRENTLY NOT IN USE
the Member DB model (member from the project crew)*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

//declare the Project table structure TODOD:
var schema = new Schema({
    memberFirstName: { type: String, required: false },
    memberLastName: { type: String, required: false },
    memberEmail: { type: String, required: false },
    memberJob: { type: String, required: false },
    
    //[{type: Schema.Types.ObjectId, ref: 'Message'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Member', schema);