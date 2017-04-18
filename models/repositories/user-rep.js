var User = require('../user'); //import 'Project' schema model
/*ADD user record to DB: */
function add(userReq, callback) {
    //creating a user record
    var user = new User({
        name: userReq.name,
        email: userReq.email,
        role: userReq.role
    });
    //saving the user to db:
    user.save(callback);
}
/*Find all users except admin  */
function findAllExceptAdmin(callback) {
    User.find({ role: { $ne: "admin" } }, callback)
}
/*Find first user matched to email input  */
function findOneByEmail(email,callback){
    User.findOne({email:email},callback);
}
/*Update user by id */
function updateById(userId, user, callback) {
    User.findByIdAndUpdate(userId, { $set: user },
        callback);
}
/*Delete user by id */
function deleteById(userId, callback) {
    User.findByIdAndRemove(userId,
        callback);
}

module.exports = {
    add: add,
    findAllExceptAdmin: findAllExceptAdmin,
    findOneByEmail : findOneByEmail,
    updateById: updateById,
    deleteById: deleteById

};