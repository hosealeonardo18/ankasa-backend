const express = require('express');
const router = express.Router();

// Import controller
const passengerController = require('../controller/passengers');

// Passenger routes
router.get("/", passengerController.getAllPassengers);
router.get("/:id", passengerController.getDetailPassenger);
router.get("/booking/:id_booking", passengerController.getBookingPassenger);

module.exports = router;