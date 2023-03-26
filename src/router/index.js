const express = require('express');
const router = express.Router();

// Import routes
const userRouter = require('./user');
const adminRoutes = require('./admin');
const cityRouter = require('./city');
const airlinesRouter = require('./airlines');
const flightsRoutes = require('./flight');
const creditCardRouter = require('./creditCard');
const bookingRouter = require('./booking');
const passengerRoute = require('./passenger');
const reviewsRoute = require('./review');

// Use routes
router.use('/user', userRouter);
router.use('/admin', adminRoutes);
router.use('/city', cityRouter);
router.use('/airline', airlinesRouter);
router.use('/flight', flightsRoutes);
router.use('/creditCard', creditCardRouter);
router.use('/booking', bookingRouter);
router.use('/passenger', passengerRoute);
router.use('/review', reviewsRoute);

module.exports = router;