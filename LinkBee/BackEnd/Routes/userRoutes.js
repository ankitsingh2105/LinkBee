const express = require('express');
const router = express.Router();
const verifyUser = require("../middleware/verifyUserMiddleWare")
const userModel = require("../models/userModel");


router.get('/', verifyUser, async (req, response) => {
    const userID = req.userInfo.userID;
    try {
        let userData = await userModel.findOne({ userID });
        const name = userData.name;
        response.status(200).send({
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
        response.status(404);
    }
});


router.post('/displayUser', async (req, response) => {
    const userID = req.body.userID
    try {
        let userData = await userModel.findOne({ userID });
        if (!userData) {
            return response.status(404).send("Please login");
        }
        response.status(200).send({
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
        response.status(404);
    }
});

router.post('/logout', (req, response) => {
    response.clearCookie('token', {
        secure: true, 
        sameSite: 'none', 
    }).send();
});



router.put("/updateBackEnd", verifyUser, async (req, response) => {
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
        await userModel.findOneAndUpdate({ "userID": userID }, {
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
        response.status(200).send("updated");

    } catch (error) {
        response.status(404).send(error);
    }
});


router.post("/analytics", verifyUser, async (req, response) => {
    const { userID, link } = req.body;
    try {
        const user = await userModel.findOneAndUpdate(
            { userID: userID, 'linkArray.link': link },
            { $inc: { 'linkArray.$.count': 1 } },
            { new: true }
        );
        response.status(200);
    } 
    catch (error) {
        response.send(error);
    }
})
router.post("/getLinkanalytics", verifyUser,  async (req, response) => {
    const { userID } = req.body;
    try {
        const linkStats = await userModel.findOne({ userID })
        response.send(linkStats.linkArray);
    }
    catch (error) {
        response.status(404).send(error);
    }
})

module.exports = router; 
