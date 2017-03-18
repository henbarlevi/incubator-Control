/*the project DB model*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

//declare the Project table structure TODOD:
var schema = new Schema({
    projectName: { type: String, required: true },
    source: { type: String, required: true },
    petitionDate: { type: String, required: true },
    crew:[{memberFirstName:String,memberLastName:String,memberPhone:String,memberEmail:String,memberJob:String}],//array of member objects
    status: { type: String, required: true },
    projectDomain: { type: [String], required: true }, 
    filledPitch: {filled: {type: Boolean, required: true }, filledReminder:String },    
    filledQuestions: {filled: {type: Boolean, required: true }, filledReminder:String },
    signedFinder: {filled: {type: Boolean, required: true }, filledReminder:String },
    programSuggested :{type:[String] , required:true} ,
    
    files: [{type: Schema.Types.ObjectId, ref: 'File'}], //The ref option is what tells Mongoose which model to use during population (Join in sql terms)
    eventsReference: [{type: Schema.Types.ObjectId, ref: 'Event-Ref'}],
    businessDevelopment:[{type: Schema.Types.ObjectId, ref: 'Business-Dev'}],
    seedAid: [{type: Schema.Types.ObjectId, ref: 'Seed-Aid'}]
    
});//array fields with mongoose http://stackoverflow.com/questions/26423508/mongoose-assign-field-of-type-array-of-strings

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Project', schema);

