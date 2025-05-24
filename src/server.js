import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import bookRoutes from "./routes/book.route.js";
import reviewRoutes from "./routes/review.route.js";
import searchRoutes from "./routes/search.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/search", searchRoutes);

app.listen(PORT, () => {
    console.log("server is running on " + PORT);
    connectDB();
});