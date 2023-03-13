const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/validateUser");

router.post("/register", validateRegister, adminController.registerAdmin);
router.post("/login", validateLogin, adminController.loginAdmin);
router.post("/refresh-token", adminController.refreshToken);
router.get("/", adminController.selectAllAdmin);

module.exports = router;
