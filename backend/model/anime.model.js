import mongoose from 'mongoose';

const episodeSchema = new mongoose.Schema({
    episode_number: { type: Number, required: true },
    episode_title: { type: String, required: true },
    episode_video_url: { type: String,required: true },
    episode_description: { type: String},
});

const animeSchema = new mongoose.Schema({
    title: { type: String,required: true, unique: true },
    img_url: { type: String,required: true },
    img_panel: { type: String,required: true },
    description: { type: String },
    genres: [{ type: String }],
    episodes: [episodeSchema], 
});

export const Anime = mongoose.model("Anime", animeSchema);