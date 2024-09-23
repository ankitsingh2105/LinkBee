const jwt = require("jsonwebtoken");
const SECRET_KEY = "aman";

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if (error) {
            console.log(token)
            console.log("error os :: " , error)
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.userInfo = decoded;
        next();
    });
}; 

module.exports = verifyUser;
