var mongoose = require("mongoose");
mongoose.connect('mongodb://adminV:1qaz!QAZ!@ds053305.mongolab.com:53305/carpoolingdb');

var mongoSchema = mongoose.Schema;

var userSchema = {
"userEmail" : String,
"userPassword" : String
};

module.exports = mongoose.model('userLogin',userSchema);

// Add other schemas here....