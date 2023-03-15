const express = require('express');
const reviewController = require('../controller/reviews');
const router = express.Router();
const { verifyToken, isUser } = require("../middleware/auth");

router.get('/', reviewController.getAllReviews);
router.get('/user', verifyToken, isUser, reviewController.getUserReviews);
router.get('/:id', reviewController.getDetailReviews);

router.post('/:id', verifyToken, isUser, reviewController.createReviews);
router.put('/:id', verifyToken, isUser, reviewController.updateReviews);
router.delete('/:id', verifyToken, isUser, reviewController.deleteReviews);

module.exports = router;
