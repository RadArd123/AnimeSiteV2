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
const allowedOrigins = [
    'http://localhost:5173', // local dev
    'https://animesitev2-frontend.onrender.com', // deployed frontend
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error('Not allowed by CORS')); // Block the request
      }
    },
    credentials: true, // This allows cookies to be sent
  };
  
  // Apply CORS middleware
  app.use(cors(corsOptions));


app.use("/api/auth", authRoutes);
app.use("/api/anime", animeRoutes);
app.use("/api/comments", commentRoutes);


app.listen(PORT, () => {
    connectDB();
    createAdmin();
    console.log(`Server is running on port ${PORT}`);
});
