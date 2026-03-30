const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
router.get('/admin/all', reviewController.getAllReviews);  // Add this before the /:productId route
router.get('/:productId', reviewController.getReviews);
router.post('/', reviewController.addReview);
router.delete('/:id', reviewController.deleteReview);  //

module.exports = router;