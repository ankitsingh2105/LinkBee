const jwt = require("jsonwebtoken");
const SECRET_KEY = "ankit";

const verifyUser = (req, res, next) => {
    // Get token from cookies
    // const token = req.cookies.token;
    // const token = req.headers["authorization"]
    console.log(req.cookie)
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
        req.user = decoded;
        next();
    });
}; 

module.exports = verifyUser;
