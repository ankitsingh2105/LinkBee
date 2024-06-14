const express = require('express');
const router = express.Router();
const userModel = require("../models/userModel");
const SECRET_KEY = "ankit";
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

// Use cookie-parser middleware
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

        res.cookie('token', token, {
            httpOnly: true,
        });

        res.status(200).send({ token });
//         data
// : 
// {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiO…k0OH0.fHuanYnvrh9b
    }
    catch (error) {
        console.error('Error in login:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
