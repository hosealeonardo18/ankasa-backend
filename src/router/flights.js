const express = require("express");
const router = express.Router();
const flightsController = require("../controller/flights");
const { verifyToken, isAdmin } = require("../middleware/auth");
const {
  validateLogin,
} = require("../middleware/validateUser");

router.get("/", flightsController.getAllFlights);
router.get("/:id", flightsController.getDetailFlights);
router.post("/", validateLogin, verifyToken, isAdmin, flightsController.createFlights);
router.put("/:id", validateLogin, verifyToken, isAdmin, flightsController.updateFlights);
router.delete("/:id", validateLogin, verifyToken, isAdmin, flightsController.deleteFlights);

module.exports = router;