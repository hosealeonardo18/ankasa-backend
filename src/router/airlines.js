const express = require('express');
const router = express.Router();

// Import controller and middleware
const airlinesController = require('../controller/airlines');
const { verifyToken, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Airline routes
// Require admin authentication
router.post("/", verifyToken, isAdmin, upload.single('image'), airlinesController.createAirlines);
router.post("/:id/availability", verifyToken, isAdmin, airlinesController.airlinesAvailability);
router.put("/:id", verifyToken, isAdmin, upload.single('image'), airlinesController.updateAirlines);
router.delete("/:id", verifyToken, isAdmin, airlinesController.deleteAirlines);

// Public routes
router.get("/", airlinesController.getAllAirlines);
router.get("/:id", airlinesController.getDetailAirlines);

module.exports = router;