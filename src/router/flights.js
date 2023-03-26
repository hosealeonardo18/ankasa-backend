const express = require("express");
const router = express.Router();
const flightsController = require("../controller/flights");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.get("/", flightsController.getAllFlights);
router.get("/:id", flightsController.getDetailFlights);
router.post("/", verifyToken, isAdmin, flightsController.createFlights);
router.put("/:id", verifyToken, isAdmin, flightsController.updateFlights);
router.delete("/:id", verifyToken, isAdmin, flightsController.deleteFlights);

module.exports = router;