const express = require('express');
const router = express.Router();

const userModel = require("../models/userModel.js");

router.use(express.json());
router.post('/', async(req, response, next) => {
    const {name , email , userID , password} = req.body;
    console.log(" okk " , req.body);
    console.log("signin route");
    try{
        const user=new userModel({name , email , userID , password});
        await user.save();
        // await userModel.create({
        //     name , email , userID , password
        // })
        // await userModel.save();     
        return user;   
    }
    catch(error){
        console.log("soemthing went wrong", error);
        response.send("Duplacates not allowed");
    }
    next();
});

module.exports = router;
