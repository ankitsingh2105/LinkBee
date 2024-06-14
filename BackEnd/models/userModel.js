const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    profileName: {
        type: String
    },
    bio: {
        type: String
    },
    gradient: {
        type: String
    },
    bgColor: {
        type: String,
    },
    fontColor: {
        type: String,
    },
    fontFamily: {
        type: String, 
    },
    backImage: { 
        type: String,
    }
})  
 
const userModel = mongoose.model("userModel", userSchema);



module.exports = userModel;