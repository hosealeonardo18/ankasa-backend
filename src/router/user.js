const express = require("express");
const router = express.Router();

// Import controller and middleware
const userController = require("../controller/userController");
const { verifyToken, isUser } = require("../middleware/auth");
const { validateRegister, validateLogin } = require("../middleware/validateUser");
const upload = require("../middleware/upload");

// User routes
// User authentication routes
router.post("/register", validateRegister, userController.registerUser);
router.post("/registerVerif", userController.registerVerif);
router.get("/verif/:id", userController.verifUser);
router.post("/login", validateLogin, userController.loginUser);
router.post("/refresh-token", userController.refreshToken);

// Require user authentication
router.get("/profile", verifyToken, isUser, userController.profileUser);
router.put("/edit/:id", verifyToken, isUser, upload.single("image"), userController.editProfile);

// Public routes
router.get("/", userController.selectAllUser);

module.exports = router;