const express = require("express");
const router = express.Router();

// Import controller and middleware
const adminController = require("../controller/adminController");
const { validateRegister, validateLogin } = require("../middleware/validateUser");

// Admin routes
// Admin authentication routes
router.post("/register", validateRegister, adminController.registerAdmin);
router.post("/login", validateLogin, adminController.loginAdmin);
router.post("/refresh-token", adminController.refreshToken);

// Public routes
router.get("/", adminController.selectAllAdmin);

module.exports = router;