const express = require('express');
const router = express.Router();
const userModel = require("../models/userModel.js");

router.use(express.json());
router.post('/', async (req, response, next) => {
    const { name, email, userID, password } = req.body;
    try {
        const user = new userModel({
                name, email, userID, password
            }
        );
        await user.save();
        toast.success
        return user;
    }
    catch (error) {
        console.log("soemthing went wrong", error);
        response.send("Duplicates not allowed");
    }
    next();
});

module.exports = router;
