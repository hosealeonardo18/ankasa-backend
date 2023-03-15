const express = require('express');
const router = express.Router();
const creditCardController = require('../controller/creditCard');
// const {validate} = require('../middleware/common')
const { verifyToken, isUser } = require('../middleware/auth')
// const upload = require('../middleware/upload');

router.get("/", creditCardController.getAllCredit);
router.get("/:id", verifyToken, isUser, creditCardController.getDetailCredit); //Get credit card by id user
router.post("/", verifyToken, isUser, creditCardController.createCredit);
router.post("/preffered/:id", verifyToken, isUser, creditCardController.setPreffered);
router.put("/:id", verifyToken, isUser, creditCardController.updateCredit);
router.delete("/:id", verifyToken, isUser, creditCardController.deleteCredit);

module.exports = router;