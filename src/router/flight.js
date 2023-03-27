const express = require("express");
const router = express.Router();

// Import controller and middleware
const flightsController = require("../controller/flights");
const { verifyToken, isAdmin, authFlight } = require("../middleware/auth");

// Flight routes
// Require admin authentication
router.post("/", verifyToken, isAdmin, authFlight, flightsController.createFlights);
router.put("/:id", verifyToken, isAdmin, authFlight, flightsController.updateFlights);
router.delete("/:id", verifyToken, isAdmin, authFlight, flightsController.deleteFlights);

// Public routes
router.get("/", flightsController.getAllFlights);
router.get("/:id", flightsController.getDetailFlights);

module.exports = router;