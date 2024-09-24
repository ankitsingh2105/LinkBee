const express = require('express');
const router = express.Router();
const userModel = require("../models/userModel");
const SECRET_KEY = "aman";
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

        res.cookie('token', token, {
            secure: true,
            sameSite: 'none',  
        });
        res.status(200).send({ token });
    }
    catch (error) {
        res.status(500);
    }
});

module.exports = router;
