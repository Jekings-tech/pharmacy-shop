const Review = require('../models/Review');

// Get reviews for a product
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
        res.json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add a review
exports.addReview = async (req, res) => {
    try {
        const { productId, reviewerName, rating, comment } = req.body;
        const review = new Review({ productId, reviewerName, rating, comment });
        await review.save();
        res.json({ success: true, review });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// Delete a review (Admin only)
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }
        
        await review.deleteOne();
        res.json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Delete review error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};