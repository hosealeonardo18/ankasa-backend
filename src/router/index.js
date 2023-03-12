const express = require("express");
const router = express.Router();

/////////////////////////////////////////////////////////////////
//user
const userRouter = require("./user.router");
router.use("/v1/user", userRouter);

module.exports = router;
