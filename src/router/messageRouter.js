const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth");
const { getMessage } = require("../controller/messageController");

router.get("/:id", verifyToken, getMessage);

module.exports = router;
