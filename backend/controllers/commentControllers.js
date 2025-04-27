import {Comment} from '../model/comment.model.js';


export const createComment = async (req, res) => {
    const { text} = req.body; // Destructure animeId from req.body
    const { animeId } = req.params; // id is likely related to the route parameter
    const userId = req.userId; // Assuming req.user contains the userId

    try {
        if (!text) {
            throw new Error("Please provide a text message");
        }

        const createComment = new Comment({
            userId,
            animeId, // Correct usage
            text,
        });

        await createComment.save();
        res.status(201).json({ success: true, message: "Comment created successfully", createComment });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
};

export const getComments = async (req,res) => {
    const {animeId} = req.params;

    try{
        const comments = await Comment.find({animeId}).populate("userId", "username");
        res.status(200).json({success: true, message: "Comments fetch successfully", comments})
    }catch(err){
        console.log("Error fetching comments: ",err );
        res.status(500).json({message: "Failed to get comments",err})
    } 
};
