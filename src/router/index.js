const express = require("express");
const router = express.Router();

/////////////////////////////////////////////////////////////////
//user
const userRouter = require("./authRoutes");
router.use("/user", userRouter);

module.exports = router;
