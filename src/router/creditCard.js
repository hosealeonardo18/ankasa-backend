const express = require('express');
const router = express.Router();
const creditCardController = require('../controller/creditCard');
// const {validate} = require('../middleware/common')
const {verifyToken} = require('../middleware/auth')
// const upload = require('../middleware/upload');

router.get("/",  creditCardController.getAllCredit);
router.post("/", verifyToken, creditCardController.createCredit);
router.post("/preffered/:id", verifyToken, creditCardController.setPreffered);
router.get("/:id", creditCardController.getDetailCredit);
router.put("/:id", verifyToken, creditCardController.updateCredit);
router.delete("/:id", creditCardController.deleteCredit);

module.exports = router;