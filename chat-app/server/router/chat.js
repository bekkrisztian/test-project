const router = require("express").Router();
const { chat, create, messages, deleteChat, imageUpload } = require("../controllers/chatController");
const { validate } = require("../validators");
const { authMiddleware } = require("../middleware/authMiddleware");
const { chatFile } = require("../middleware/fileUpload");

router.post("/", [authMiddleware], chat);
router.post("/create", [authMiddleware], create);
router.post("/messages", [authMiddleware], messages);
router.post("/upload-image", [authMiddleware, chatFile], imageUpload);
router.delete("/:id", [authMiddleware], deleteChat);

module.exports = router;