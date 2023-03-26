const express = require('express');
const router = express.Router();
const creditCardController = require('../controller/creditCard');
const { verifyToken, isUser } = require('../middleware/auth')

router.get("/", creditCardController.getAllCredit);
router.get("/:id", verifyToken, isUser, creditCardController.getUserCreditCards);
router.post("/", verifyToken, isUser, creditCardController.createCreditCard);
router.post("/preffered/:id", verifyToken, isUser, creditCardController.setPreffered);
router.put("/:id", verifyToken, isUser, creditCardController.updateCredit);
router.delete("/:id", verifyToken, isUser, creditCardController.deleteCredit);

module.exports = router;