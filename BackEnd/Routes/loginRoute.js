const express = require('express');
const router = express.Router();
const userModel = require("../models/userModel");
const SECRET_KEY = "ankit";
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.post('/', async (req, res) => {
    const { userID, password } = req.body;

    try {
        const isValidUser = await userModel.findOne({ userID, password });
        if (!isValidUser) {
            return res.status(401).send({ message: 'Invalid Credentials' });
        }
        const token = jwt.sign({ userID }, SECRET_KEY);

        // secure: true, // Ensure your site uses HTTPS
        // httpOnly: true, 
        // Domain: "https://link-bee-roan.vercel.app"
        // secure: true, 
        // sameSite: "lax",
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',  
        });
        res.status(200).send({ token });
    }
    catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
