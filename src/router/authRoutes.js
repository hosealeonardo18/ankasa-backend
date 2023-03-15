const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { verifyToken, isUser } = require("../middleware/auth");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/validateUser");
const upload = require("../middleware/upload");

router.post("/register", validateRegister, userController.registerUser);
router.post("/login", validateLogin, userController.loginUser);
router.post("/refresh-token", userController.refreshToken);
router.get("/profile", verifyToken, isUser, userController.profileUser);
router.put(
  "/edit/:id",
  verifyToken,
  isUser,
  upload.single("image"),
  userController.editProfile
);
router.get("/", userController.selectAllUser)
// verif
router.post("/registerVerif", userController.registerVerif);
router.get("/verif/:id", userController.verifUser);

module.exports = router;
