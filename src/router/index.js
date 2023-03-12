const express = require("express");
const router = express.Router();

/////////////////////////////////////////////////////////////////
//user
const userRouter = require("./authRoutes");
router.use("/users", userRouter);

const messageRoutes = require("./messageRouter");
const adminRoutes = require("./adminRoutes");

router.use("/user", userRouter);
router.use("/admin", adminRoutes);
router.use("/message", messageRoutes);

// airlines
const airlinesRouter = require("./airlines");
router.use("/airlines", airlinesRouter);

// city
const cityRouter = require("./cityRouter");
router.use("/city", cityRouter);

// credit card
const creditCardRouter = require("./creditCard");
router.use("/creditCard", creditCardRouter);

module.exports = router;
