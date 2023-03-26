const express = require('express');
const router = express.Router();

// Import controller and middleware
const creditCardController = require('../controller/creditCard');
const { verifyToken, isUser } = require('../middleware/auth')

// Credit card routes
// Require user authentication
router.get("/:id", verifyToken, isUser, creditCardController.getUserCreditCards);
router.post("/", verifyToken, isUser, creditCardController.createCreditCard);
router.post("/preffered/:id", verifyToken, isUser, creditCardController.setPreffered);
router.put("/:id", verifyToken, isUser, creditCardController.updateCredit);
router.delete("/:id", verifyToken, isUser, creditCardController.deleteCredit);

// Public routes
router.get("/", creditCardController.getAllCredit);

module.exports = router;