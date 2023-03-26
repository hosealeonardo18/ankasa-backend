const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const { verifyToken, isSuperAdmin } = require("../middleware/auth");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/validateUser");

router.post("/register", verifyToken, isSuperAdmin, validateRegister, adminController.registerAdmin);
router.post("/login", validateLogin, adminController.loginAdmin);
router.post("/refresh-token", adminController.refreshToken);
router.get("/", verifyToken, isSuperAdmin, adminController.selectAllAdmin);
router.get("/profile", verifyToken, adminController.profileAdmin);
router.put("/:id", verifyToken, isSuperAdmin, adminController.updateAdmin);
router.delete("/:id", verifyToken, isSuperAdmin, adminController.deleteAdmin);

router.post("/register-superadmin", validateRegister, adminController.createSuperAdmin);

module.exports = router;
