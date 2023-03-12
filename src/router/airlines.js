const express = require('express');
const router = express.Router();
const airlinesController = require('../controller/airlines');
// const {validate} = require('../middleware/common')
// const {protect} = require('../middleware/auth')
const upload = require('../middleware/upload');

router.get("/",  airlinesController.getAllAirlines);
router.post("/", upload.single('image'), airlinesController.createAirlines);
router.get("/:id", airlinesController.getDetailAirlines);
router.put("/:id", airlinesController.updateAirlines);
router.delete("/:id", airlinesController.deleteAirlines);

module.exports = router;