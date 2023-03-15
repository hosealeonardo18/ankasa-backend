const express = require('express');
const router = express.Router();
const airlinesController = require('../controller/airlines');
const { verifyToken, isAdmin } = require('../middleware/auth');
// const {validate} = require('../middleware/common')
// const {protect} = require('../middleware/auth')
const upload = require('../middleware/upload');

router.get("/", airlinesController.getAllAirlines);
router.get("/:id", airlinesController.getDetailAirlines);
router.post("/", verifyToken, isAdmin, upload.single('image'), airlinesController.createAirlines);
router.post("/:id/availability", verifyToken, isAdmin, airlinesController.airlinesAvailability);
router.put("/:id", verifyToken, isAdmin, upload.single('image'), airlinesController.updateAirlines);
router.delete("/:id", verifyToken, isAdmin, airlinesController.deleteAirlines);

module.exports = router;