const mongoose = require("mongoose");


const urlSchema = new mongoose.Schema({
    class : {
        type :String,
    },
    color : {
        type : String,
    },
    link : {
        type : String,
    },
    name : {
        type : String,
    },
    title : {
        type : String
    },
    count : {
        type : Number,
        default: 0
    },  
  });
  

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
    profile: {
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
    },
    bioAndProfileColor : {
        type : String
    },
    linkArray : [urlSchema]
})  
 
const userModel = mongoose.model("userModel", userSchema);



module.exports = userModel;