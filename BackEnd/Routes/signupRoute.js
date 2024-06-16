const express = require('express');
const router = express.Router();

const userModel = require("../models/userModel.js");

router.use(express.json());
router.post('/', async (req, response, next) => {
    const { name, email, userID, password } = req.body;
    console.log(" okk ", req.body);
    console.log("signin route");
    try {
        const user = new userModel({ 
                name, email, userID, password 
            }
        );
        await user.save();
        return user;
    }
    catch (error) {
        console.log("soemthing went wrong", error);
        response.send("Duplicates not allowed");
    }
    next();
});

module.exports = router;
