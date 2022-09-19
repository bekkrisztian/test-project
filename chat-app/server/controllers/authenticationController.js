const User = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const appConfig = require("../config/appConfig");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // const secretKey = crypto.randomBytes(64).toString("hex");
        const user = await User.findOne({
            where: { email: email }
        });

        if (!user) return res.status(404).json({message: `User not found with this email address: ${email}`});
        if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({message: "Incorrect password!"});

        const userToken = generateCustomToken(user.get({ raw: true }));
        if (user.avatar) {
            userToken.user.avatar = user.avatar;
        }
        return res.status(200).json(userToken);
    } catch (err) {
        return res.status(500).json({message: `[LOGIN] Something went wrong: ${err.message}`});
    }
}

exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const userToken = generateCustomToken(user.get({ raw: true }));
        return res.status(200).json(userToken);
    } catch (err) {
        return res.status(500).json({message: `[REGISTER] Something went wrong: ${err.message}`});
    }
}

const generateCustomToken = user => {
    delete user.password;
    const token = jwt.sign(user, appConfig.KEY, { expiresIn: 604800 });
    return { ...{user}, ...{token} };
}