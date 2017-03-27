/*the incubation that related to a project*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
//declare the Project files table structure TODOD:
var schema = new Schema({
    verificationAnalysis :{startDate:{type:String},endDate:{type:String}},
    volunteers:[{firstName:String,lastName:String,phone:String,email:String,job:String,status:String}],//array of volunteers
    businessProgram:{startDate:{type:String},endDate:{type:String}},
    marketingStrategy:{startDate:{type:String},endDate:{type:String}},
    productCharacterization:{startDate:{type:String},endDate:{type:String}},
    productDesign:{startDate:{type:String},endDate:{type:String}},
    productDevelopment:{startDate:{type:String},endDate:{type:String}},
    poc:{startDate:{type:String},endDate:{type:String},customerName:{type:String},result:{type:String}},
    marketing:{startDate:String,endDate:String,campaignName:String,pilotResult:String,usersAmount:String,pricePerUser:String},
    project: {type: Schema.Types.ObjectId, ref: 'Project'}

});//array fields with mongoose http://stackoverflow.com/questions/26423508/mongoose-assign-field-of-type-array-of-strings

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Incubation', schema);