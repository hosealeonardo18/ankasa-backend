const express = require('express');
const router = express.Router();
const cityController = require('../controller/city');
// const {validate} = require('../middleware/common')
// const {protect} = require('../middleware/auth')
const upload = require('../middleware/upload');

router.get("/",  cityController.getAllCity);
router.post("/", upload.single('image'), cityController.createCity);
router.get("/:id", cityController.getDetailCity);
router.put("/:id", upload.single('image'), cityController.updateCity);
router.delete("/:id", cityController.deleteCity);

module.exports = router;