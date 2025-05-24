import Book from "../models/book.model.js";
import Review from "../models/review.model.js";

export const addBook = async (req, res) => {
    try {
        const { title, author, genre } = req.body;
        const book = new Book({ title, author, genre, createdBy: req.user });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, author, genre } = req.query;
        const filter = {};
        if (author) filter.author = new RegExp(author, 'i');
        if (genre) filter.genre = genre;

        const books = await Book.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id).lean();
        if (!book) return res.status(404).json({ message: 'Book not found' });

        // average rating
        const reviews = await Review.find({ book: id });
        const avgRating = reviews.length
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

        // paginated reviews
        const { page = 1, limit = 5 } = req.query;
        const paginatedReviews = await Review.find({ book: id })
            .populate('user', 'username')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json({ ...book, averageRating: avgRating, reviews: paginatedReviews });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addReview = async (req, res) => {
    try {
        const { id: bookId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user;
        console.log(userId);
        let review = await Review.findOne({ book: bookId, user: userId });
        if (review) {
            review.rating = rating;
            review.comment = comment;
            await review.save();
            return res.json(review);
        }

        review = new Review({ book: bookId, user: userId, rating, comment });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};