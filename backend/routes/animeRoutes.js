import express from 'express';
import { createAnime, createEpisode, getAnimes, getAnimeById } from '../controllers/animeControllers.js';

const router = express.Router();

router.post("/create", createAnime);
router.post("/episode/:title", createEpisode);
router.get("/getAnimes", getAnimes);
router.get("/getAnime/:id", getAnimeById);

export default router;