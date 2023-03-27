const express = require('express');
const router = express.Router();

// Import controller and middleware
const bookingController = require("../controller/booking");
const { verifyToken, isAdmin, isUser } = require("../middleware/auth");

// Booking routes
// Require user authorization
router.get("/user", verifyToken, isUser, bookingController.getUserBooking);
router.post("/:id_flight", verifyToken, isUser, bookingController.createBooking);

// Require admin authorization
router.put("/:id", verifyToken, isAdmin, bookingController.updateBooking);
router.delete("/:id", verifyToken, isAdmin, bookingController.deleteBooking);
router.post("/status/:id", verifyToken, isAdmin, bookingController.setStatusBooking);

// Public routes
router.get("/", bookingController.getAllBookings);
router.get("/:id", bookingController.getDetailBooking);

module.exports = router;