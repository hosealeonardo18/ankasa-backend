const express = require('express');
const router = express.Router();
const cityController = require('../controller/city');
const { verifyToken, isAdmin } = require('../middleware/auth');
// const {validate} = require('../middleware/common')
// const {protect} = require('../middleware/auth')
const upload = require('../middleware/upload');

router.get("/", cityController.getAllCity);
router.get("/:id", cityController.getDetailCity);
router.post("/", verifyToken, isAdmin, upload.single('image'), cityController.createCity);
router.put("/:id", verifyToken, isAdmin, upload.single('image'), cityController.updateCity);
router.delete("/:id", verifyToken, isAdmin, cityController.deleteCity);

module.exports = router;