var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {type: Boolean, default: false},
    avatar: {type: String, default: "https://djqvcbmmgpti5.cloudfront.net/assets/accounts/default-avatar-c7865b464e0a56a7e88d8c8b1fe45ba928adddcd58022b94d0527c4cbd729d39.png"},
    firstName: String,
    lastName: String,
    email: String,
    about: String
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);