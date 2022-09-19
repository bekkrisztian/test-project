const router = require("express").Router();
const auth = require("./authentication");
const users = require("./user");
const chats = require("./chat");

router.get("/home", (req, res) => {
    return res.send("Home screen");
});

router.use("/", auth);
router.use("/users", users);
router.use("/chats", chats);

module.exports = router;