const express = require('express');
const router = express.Router();
const passengerController = require('../controller/passengers');

router.get("/", passengerController.getAllPassengers);
router.get("/:id", passengerController.getDetailPassenger);
router.get("/booking/:id_booking", passengerController.getBookingPassenger);

module.exports = router;