import express from "express";
import { getBookBySearch } from "../controllers/search.controller.js";

const router = express.Router();

router.get('/', getBookBySearch);

export default router;