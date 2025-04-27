import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    animeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime',
        required: true
    },
    text: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
});

export const Comment = mongoose.model('Comment', commentSchema);