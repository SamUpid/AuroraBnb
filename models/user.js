const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema= new Schema({
    email: {
        type: String,
        required: true
    }
});

// Plugging in passport-local-mongoose to add username, hashed password, salt, and authentication methods automatically
userSchema.plugin(passportLocalMongoose);

// Exporting the User model so it can be used elsewhere in the project
module.exports = mongoose.model('User', userSchema);