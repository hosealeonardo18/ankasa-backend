const express = require("express");
const router = express.Router();
const flightsController = require("../controller/flights");
const { verifyToken, authFlight } = require("../middleware/auth");
// const {
//   validateLogin,
// } = require("../middleware/validateUser");

router.get("/", flightsController.getAllFlights);
router.get("/:id", flightsController.getDetailFlights);
router.post("/", verifyToken, authFlight, flightsController.createFlights);
router.put("/:id", flightsController.updateFlights);
router.delete("/:id", flightsController.deleteFlights);

module.exports = router;