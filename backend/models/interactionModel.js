import mongoose from 'mongoose';

const interactionModel = mongoose.Schema(
    {
        postId: { type: String, require: true },
        comments: [
            {
                user: {
                    name: { type: String, require: true },
                    image: { type: String, require: true },
                },
                content: { type: String, require: true },
                time: { type: Date, require: true },
            },
        ],
        likes: [{ id: { type: String, require: true } }],
    },
    {
        timestamps: true,
        id: true,
    }
);

const Interaction = mongoose.model('Interaction', interactionModel);

export default Interaction;
