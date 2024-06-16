const express = require('express');
const router = express.Router();
const userModel = require("../models/userModel");
const SECRET_KEY = "ankit";
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.post('/', async (req, res) => {
    const { userID, password } = req.body;
    console.log(userID, password);
    console.log("I am in login");

    try {
        const isValidUser = await userModel.findOne({ userID, password });
        if (!isValidUser) {
            console.log("invalid credentials");
            return res.status(401).send({ message: 'Invalid Credentials' });
        }
        const token = jwt.sign({ userID }, SECRET_KEY);

        // secure: true, // Ensure your site uses HTTPS
        // httpOnly: false,
        // sameSite: "none",
        res.cookie('token', token, {
            secure: true, 
            httpOnly: true, 
            sameSite: 'none', 
            Domain: "https://link-bee-roan.vercel.app"
        });
        res.status(200).send({ token });
    }
    catch (error) {
        console.error('Error in login:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
