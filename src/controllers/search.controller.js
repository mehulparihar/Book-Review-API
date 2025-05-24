import Book from "../models/book.model.js";

export const getBookBySearch = async (req, res) => {
    try {
        const { q } = req.query;
        const books = await Book.find({
            $or: [
                { title: new RegExp(q, 'i') },
                { author: new RegExp(q, 'i') }
            ]
        });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};