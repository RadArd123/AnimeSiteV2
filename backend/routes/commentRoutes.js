import express from 'express';
import { createComment, getComments } from '../controllers/commentControllers.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();


router.post("/create/:animeId", verifyToken, createComment);
router.get("/getComments/:animeId", getComments);

export default router;