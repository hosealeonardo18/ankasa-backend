const express = require("express");
const router = express.Router();

// Import controller and middleware
const flightsController = require("../controller/flights");
const { verifyToken, isAdmin } = require("../middleware/auth");

// Flight routes
// Require admin authentication
router.post("/", verifyToken, isAdmin, flightsController.createFlights);
router.put("/:id", verifyToken, isAdmin, flightsController.updateFlights);
router.delete("/:id", verifyToken, isAdmin, flightsController.deleteFlights);

// Public routes
router.get("/", flightsController.getAllFlights);
router.get("/:id", flightsController.getDetailFlights);

module.exports = router;