import mongoose from 'mongoose';

const commentModel = mongoose.Schema(
    {
        user: {
            id: { type: String, require: true },
            name: { type: String, require: true },
            image: { type: String, require: true },
        },
        content: { type: String, require: true },
    },
    {
        timestamps: true,
        id: true,
    }
);

const Comment = mongoose.model('Comment', commentModel);

export default Comment;
