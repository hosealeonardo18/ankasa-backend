const express = require('express');
const router = express.Router();
const bookingController = require("../controller/booking");
// const {validate} = require('../middleware/common')
// const {protect} = require('../middleware/auth')
const upload = require('../middleware/upload');
const { verifyToken, isAdmin, isUser } = require("../middleware/auth");

router.get("/", bookingController.getAllBookings);
router.get("/user", verifyToken, isUser, bookingController.getUserBooking);
router.get("/:id", bookingController.getDetailBooking);
router.post("/:id_flight", verifyToken, isUser, bookingController.createBooking);
router.put("/:id", verifyToken, isAdmin, bookingController.updateBooking);
router.delete("/:id", verifyToken, isAdmin, bookingController.deleteBooking);

router.post("/status/:id", verifyToken, isAdmin, bookingController.setStatusBooking);

module.exports = router;