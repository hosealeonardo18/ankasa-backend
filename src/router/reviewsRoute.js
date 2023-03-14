const express = require('express');
const reviewController = require('../controller/reviews');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', reviewController.getAllReviews);
router.get('/user', auth.verifyToken, reviewController.getUserReviews);
router.get('/:id', reviewController.getDetailReviews);

router.post('/:id', auth.verifyToken, reviewController.createReviews);
router.put('/:id', auth.verifyToken, reviewController.updateReviews);
router.delete('/:id', auth.verifyToken, reviewController.deleteReviews);

module.exports = router;
