const express = require('express');
const router = express.Router();
const bookingController = require("../controller/booking");
// const {validate} = require('../middleware/common')
// const {protect} = require('../middleware/auth')
const upload = require('../middleware/upload');
const { verifyToken, isAdmin } = require("../middleware/auth");

router.get("/",  bookingController.getAllBookings);
router.get("/user", verifyToken, bookingController.getUserBooking);
router.get("/:id", bookingController.getDetailBooking);
router.post("/:id_flight", verifyToken, bookingController.createBooking);
router.put("/:id", verifyToken, bookingController.updateBooking);
router.delete("/:id", verifyToken, bookingController.deleteBooking);

router.post("/status/:id", verifyToken, bookingController.setStatusBooking);

module.exports = router;