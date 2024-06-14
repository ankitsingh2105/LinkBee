const express = require('express');
const router = express.Router();
const verifyUser = require("../middleware/verifyUserMiddleWare")
const userModel = require("../models/userModel");

router.post('/:userId', verifyUser, async (req, response) => {
    const userID = req.params.userId;
    try {
        let userData = await userModel.findOne({ userID });
        response.send(userData.name);
    }
    catch (error) {
        response.send(error);
    }
    console.log("verification successfull");
});

module.exports = router;
