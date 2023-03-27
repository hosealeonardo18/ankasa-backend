const express = require('express');
const router = express.Router();

// Import controller and middleware
const cityController = require('../controller/city');
const { verifyToken, isAdmin, authCity } = require('../middleware/auth');
const upload = require('../middleware/upload');

// City routes
// Require admin authentication
router.post("/", verifyToken, isAdmin, authCity, upload.single('image'), cityController.createCity);
router.put("/:id", verifyToken, isAdmin, upload.single('image'), cityController.updateCity);
router.delete("/:id", verifyToken, isAdmin, cityController.deleteCity);

// Public routes
router.get("/", cityController.getAllCity);
router.get("/:id", cityController.getDetailCity);

module.exports = router;