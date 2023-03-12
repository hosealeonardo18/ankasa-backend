const express = require("express");
const router = express.Router();

/////////////////////////////////////////////////////////////////
//user
const userRouter = require("./authRoutes");
const messageRoutes = require("./messageRouter");
const adminRoutes = require("./adminRoutes");

router.use("/user", userRouter);
router.use("/admin", adminRoutes);
router.use("/message", messageRoutes);

module.exports = router;
