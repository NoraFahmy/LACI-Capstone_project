const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
//i didn`t store user passport so instead use plugin(passportLocalMongoose)
UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema)
