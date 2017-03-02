/*The User DB model*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role:{type:String , required: true},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}] //The ref option is what tells Mongoose which model to use during population (Join in sql terms)

});//http://mongoosejs.com/docs/populate.html

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);