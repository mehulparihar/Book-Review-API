import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addBook, getBooks, getBookById, addReview } from "../controllers/book.controller.js";

const router = express.Router();

router.post('/', protectRoute, addBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/:id/reviews',protectRoute, addReview);
export default router;