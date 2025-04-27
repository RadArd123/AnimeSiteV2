import {Anime} from '../model/anime.model.js';

export const createAnime = async (req, res) => {
    const {title , img_url, img_panel, description, genres} = req.body;
    try{
        if(!title || !img_url || !img_panel  || !genres){
            throw new Error("Please provide the necessary fields");
        }
        const anime = new Anime({
            title,
            img_url,
            img_panel,
            description,
            genres,
        })
        await anime.save();
        res.status(201).json({success:true, message:"Anime created successfully", anime});
    }catch(err){
        console.log(err);
        return res.status(400).json({success:false, message:err.message});
     
    }
};
export const createEpisode = async (req, res) => {
    const {title} = req.params;
    const {episode_number, episode_title, episode_video_url, episode_description} = req.body;
    try{
        if(!episode_number || !episode_title || !episode_video_url){
            throw new Error("Please provide the necessary fields");
        }
        const anime = await Anime.findOne({title});
        if(!anime){
            return res.status(404).json({success:false, message:"Anime not found"});
        }
        const episode = {
            episode_number,
            episode_title,
            episode_video_url,
            episode_description,
        };
        anime.episodes.push(episode);
        await anime.save();
        res.status(201).json({success:true, message:"Episode created successfully", anime});
    }catch(err){
        return res.status(400).json({success:false, message:err.message});
    }
};
export const getAnimes = async (req, res) => {
    try{
        const animes = await Anime.find({});
        res.status(200).json({success:true, message:"Animes fetched successfully", animes});
    }catch(err){
        return res.status(400).json({success:false, message:err.message});
    }
};
export const getAnimeById = async (req, res) => {
    const {id} = req.params;
    try{
        const anime = await Anime.findById(id);
        if(!anime){
            return res.status(404).json({success:false, message:"Anime not found"});
        }
        res.status(200).json({success:true, message:"Anime fetched successfully", anime});
    }catch(err){
        return res.status(400).json({success:false, message:err.message});
    }
};
