import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./db/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser"
import {createAdmin} from "./scripts/admin.js";
import animeRoutes from "./routes/animeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import cors from "cors";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: ["http://localhost:5173", "https://animesitev2-frontend.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/anime", animeRoutes);
app.use("/api/comments", commentRoutes);


app.listen(PORT, () => {
    connectDB();
    createAdmin();
    console.log(`Server is running on port ${PORT}`);
});
