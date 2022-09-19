const router = require("express").Router();
const { login, register } = require("../controllers/authenticationController");
const { validate } = require("../validators");
const { rules: registrationRules } = require("../validators/register");
const { rules: loginRules } = require("../validators/login");

router.post("/login",  [ loginRules, validate ], login);
router.post("/register", [ registrationRules, validate ], register);

module.exports = router;