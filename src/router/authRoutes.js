const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { verifyToken } = require("../middleware/auth");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/validateUser");
const upload = require("../middleware/upload");

router.post("/register", validateRegister, userController.registerUser);
router.post("/loginnn", validateLogin, userController.loginUser);
router.post("/refresh-token", userController.refreshToken);
router.get("/profile", verifyToken, userController.profileUser);
router.put(
  "/edit/:id",
  verifyToken,
  upload.single("image"),
  userController.editProfile
);

module.exports = router;
