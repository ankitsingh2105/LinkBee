const jwt = require("jsonwebtoken");
const SECRET_KEY = "ankit";

const verifyUser = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.token;
    console.log(token);
    console.log("token in middleWare :: " , token);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify token
    jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if (error) {
            console.error("Error verifying token:", error);
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.userInfo = decoded;
        next();
    });
}; 

module.exports = verifyUser;
