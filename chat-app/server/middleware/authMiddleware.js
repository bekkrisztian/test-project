const jwt = require("jsonwebtoken");
const appConfig = require("../config/appConfig");

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token)

    if (!token) return res.status(401).json({ error: "Missing token!" });

    jwt.verify(token, appConfig.KEY, (error, user) => {
        if (error) return res.status(401).json({ error });
        req.user = user;
    });
    next();
}