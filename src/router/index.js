const express = require("express");
const router = express.Router();

/////////////////////////////////////////////////////////////////
//user
const userRouter = require("./authRoutes");
router.use("/users", userRouter);

// airlinea
const airlinesRouter = require("./airlines");
router.use("/airlines", airlinesRouter);

module.exports = router;
