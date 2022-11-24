import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const postSchema = mongoose.Schema(
    {
        restaurantId: { type: String, require: true },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, require: true },
        ratings: {
            space: { type: Number, require: true },
            food: { type: Number, require: true },
            hygiene: { type: Number, require: true },
            service: { type: Number, require: true },
            price: { type: Number, require: true },
            average: { type: Number, require: true },
        },
        is_recommend: { type: Boolean, require: true },
        total: {
            people: { type: Number, require: true },
            bill: { type: Number, require: true },
        },
        images: { type: [String], require: true },
        hashtags: { type: [String], require: true },
        comments: { type: [Schema.Types.ObjectId], ref: 'Comment' },
        likes: { type: [String], require: true },
    },
    {
        timestamps: true,
        id: true,
    }
);

postSchema.plugin(paginate);

const Post = mongoose.model('Post', postSchema);

export default Post;
