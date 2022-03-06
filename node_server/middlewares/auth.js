const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");
    console.log("token",token);
    if (!token) {
        return res
            .status(401)
            .json({ msg: "You do not have the right authorization" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log(decoded.user);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Invalid token" });
    }
};
