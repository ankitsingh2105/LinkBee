const jwt = require("jsonwebtoken");
const SECRET_KEY = "ankit";

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.userInfo = decoded;
        next();
    });
}; 

module.exports = verifyUser;
