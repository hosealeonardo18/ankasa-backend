const express = require("express");
const router = express.Router();

// Import controller and middleware
const { getMessage } = require("../controller/messageController");
const { verifyToken } = require("../middleware/auth");

// Message route
router.get("/:id", verifyToken, getMessage);

module.exports = router;
