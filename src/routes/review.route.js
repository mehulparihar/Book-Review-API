import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { updateReview, deleteReview } from "../controllers/reviews.controller.js";

const router = express.Router();

router.put('/:id', protectRoute, updateReview);
router.delete('/:id', protectRoute, deleteReview);

export default router;