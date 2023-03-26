const express = require('express');
const router = express.Router();
const cityController = require('../controller/city');
const upload = require('../middleware/upload');
const { verifyToken, authCity } = require("../middleware/auth");

router.get("/", cityController.getAllCity);
router.post("/", verifyToken, authCity, upload.single('image'), cityController.createCity);
router.get("/:id", cityController.getDetailCity);
router.put("/:id", upload.single('image'), cityController.updateCity);
router.delete("/:id", cityController.deleteCity);

module.exports = router;