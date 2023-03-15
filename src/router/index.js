const express = require('express');
const router = express.Router();

/////////////////////////////////////////////////////////////////
//user
const userRouter = require('./authRoutes');
router.use('/users', userRouter);

const messageRoutes = require('./messageRouter');
const adminRoutes = require('./adminRoutes');
const flightsRoutes = require('./flights');

router.use('/user', userRouter);
router.use('/admin', adminRoutes);
router.use('/message', messageRoutes);
router.use('/flight', flightsRoutes);

// airlines
const airlinesRouter = require('./airlines');
router.use('/airline', airlinesRouter);

// city
const cityRouter = require('./cityRouter');
router.use('/city', cityRouter);

// credit card
const creditCardRouter = require('./creditCard');
router.use('/creditCard', creditCardRouter);

// credit card
const bookingRouter = require('./booking');
router.use('/booking', bookingRouter);

const reviewsRoute = require('./reviewsRoute');
router.use('/review', reviewsRoute);

module.exports = router;
