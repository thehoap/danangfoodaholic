import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        restaurantId: { type: String, require: true },
        userId: { type: String, require: true },
        title: { type: String, require: true },
        compliment: { type: String, require: true },
        need_improve: { type: String, require: true },
        ratings: {
            space: { type: Number, require: true },
            food: { type: Number, require: true },
            hygiene: { type: Number, require: true },
            service: { type: Number, require: true },
            price: { type: Number, require: true },
        },
        is_recommend: { type: Boolean, require: true },
        total: {
            people: { type: Number, require: true },
            bill: { type: Number, require: true },
        },
        images: { type: [String], require: true },
        hashtags: { type: [String], require: true },
    },
    {
        timestamps: true,
        id: true,
    }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
