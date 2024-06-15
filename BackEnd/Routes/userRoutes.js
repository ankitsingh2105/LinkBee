const express = require('express');
const router = express.Router();
const verifyUser = require("../middleware/verifyUserMiddleWare")
const userModel = require("../models/userModel");

router.get('/', verifyUser, async (req, response) => {
    const userID = req.userInfo.userID;
    console.log("user ID ::", userID);
    try {
        let userData = await userModel.findOne({ userID });
        console.log("user data :: ", userData);
        const name = userData.name;
        console.log("fonr here :: ", name, userID);
        response.send({
            profile: userData.profile,
            bio: userData.bio,
            imageUrl: userData.imageUrl,
            gradient: userData.gradient,
            fontFamily: userData.fontFamily,
            bgColor: userData.bgColor,
            fontColor: userData.fontColor,
            backImage: userData.backImage,
            bioAndProfileColor: userData.bioAndProfileColor,
            linkArray: userData.linkArray,
            userID: userData.userID,
            name: userData.name,
        });
    }
    catch (error) {
        console.log(error)
        response.send(error);
    }
    console.log("verification successfull");
});
router.post('/displayUser', async (req, response) => {
    const userID = req.body.userID
    console.log("user is ::", userID);
    try {
        let userData = await userModel.findOne({ userID });
        if (!userData) {
            return response.status(404).send("Please login");
        }
        console.log("user data :: ", userData);
        const name = userData.name;
        console.log("fonr here :: ", name, userID);
        response.send({
            profile: userData.profile,
            bio: userData.bio,
            imageUrl: userData.imageUrl,
            gradient: userData.gradient,
            fontFamily: userData.fontFamily,
            bgColor: userData.bgColor,
            fontColor: userData.fontColor,
            backImage: userData.backImage,
            bioAndProfileColor: userData.bioAndProfileColor,
            linkArray: userData.linkArray,
            userID: userData.userID,
            name: userData.name,
        });
    }
    catch (error) {
        console.log(error)
        response.send(error);
    }
    console.log("verification successfull");
});

router.post('/logout', (req, res) => {
    res.clearCookie('token').sendStatus(200);
});



router.put("/updateBackEnd", verifyUser, async (req, res) => {
    console.log("In the update area");
    const {
        profile,
        bio,
        imageUrl,
        gradient,
        fontFamily,
        bgColor,
        fontColor,
        backImage,
        bioAndProfileColor,
        userID,
        linkArray,
    } = req.body;
    try {
        // Find the user by userID
        const userData = await userModel.findOne({ userID });

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's information
        userData.profile = profile;
        userData.bio = bio;
        userData.imageUrl = imageUrl;
        userData.gradient = gradient;
        userData.fontFamily = fontFamily;
        userData.bgColor = bgColor;
        userData.fontColor = fontColor;
        userData.backImage = backImage;
        userData.bioAndProfileColor = bioAndProfileColor;
        userData.linkArray = linkArray;

        // Save the updated user data
        await userData.save();
        console.log(userData);
        // Optionally, you can respond with updated user data
        res.json(userData);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router; 
