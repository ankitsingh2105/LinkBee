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
        const updatedUser = await userModel.findOneAndUpdate({ "userID": userID }, {
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
        })

        console.log(updatedUser);
        res.json(updatedUser);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post("/analytics", async (req, response) => {
    console.log("Analytics section response :: ", req.body);
    const { userID, link } = req.body;
    console.log("userID :: ", userID);
    try {
        const user = await userModel.findOneAndUpdate(
            { userID: userID, 'linkArray.link': link },
            { $inc: { 'linkArray.$.count': 1 } },
            { new: true }
        );
        console.log("user is  :: ", user)
    } 
    catch (error) {
        console.log(error);
        response.send(error);
    }
})
router.post("/getLinkanalytics", async (req, response) => {
    console.log("Analytics section response :: ", req.body);
    const { userID } = req.body;
    console.log("userID :: ", userID);
    try {
        const linkStats = await userModel.findOne({ userID })
        response.send(linkStats.linkArray);
        console.log("user is  :: ", linkStats.linkArray);
    }
    catch (error) {
        console.log(error);
        response.send(error);
    }
})


module.exports = router; 
