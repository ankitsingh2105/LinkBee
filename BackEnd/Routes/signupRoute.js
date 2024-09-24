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
        response.status(200);
    }
    catch (error) {
        console.log("soemthing went wrong", error);
        response.status(404);
    }
    next();
});

module.exports = router;
