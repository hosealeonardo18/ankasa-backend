const express = require('express');
const router = express.Router();

// Import controller and middleware
const reviewController = require('../controller/reviews');
const { verifyToken, isUser } = require("../middleware/auth");

// Review routes
// Require user authentication
router.get('/user', verifyToken, isUser, reviewController.getUserReviews);
router.post('/:id', verifyToken, isUser, reviewController.createReviews);
router.put('/:id', verifyToken, isUser, reviewController.updateReviews);
router.delete('/:id', verifyToken, isUser, reviewController.deleteReviews);

// Public routes
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getDetailReviews);

module.exports = router;