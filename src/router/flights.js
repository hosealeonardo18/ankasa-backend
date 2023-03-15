const express = require("express");
const router = express.Router();
const flightsController = require("../controller/flights");
const { verifyToken, isAdmin, isUser } = require("../middleware/auth");
const {
  validateLogin,
} = require("../middleware/validateUser");

router.get("/", flightsController.getAllFlights);
router.get("/:id", flightsController.getDetailFlights);
router.post("/", verifyToken, isAdmin, flightsController.createFlights);
router.put("/:id", verifyToken, isAdmin, flightsController.updateFlights);
router.delete("/:id", verifyToken, isAdmin, flightsController.deleteFlights);

module.exports = router;