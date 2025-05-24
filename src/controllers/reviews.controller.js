import Review from "../models/review.model.js";

export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review || (review.user.toString()) !== req.user._id.toString())
            return res.status(403).json({ message: 'Not authorized' });

        Object.assign(review, req.body);
        await review.save();
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review || (review.user.toString()) !== req.user._id.toString())
            return res.status(403).json({ message: 'Not authorized' });

        await review.deleteOne();
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}