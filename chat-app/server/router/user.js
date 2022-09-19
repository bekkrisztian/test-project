const router = require("express").Router();
const { update, search } = require("../controllers/userController");
const { validate } = require("../validators");
const { authMiddleware } = require("../middleware/authMiddleware");
const { rules: updateRules } = require("../validators/userUpdate");
const { userFile } = require("../middleware/fileUpload");

router.post("/update", [authMiddleware, userFile, updateRules, validate], update);
router.get("/search-user", [authMiddleware], search);

module.exports = router;