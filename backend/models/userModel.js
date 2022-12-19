import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const userSchema = mongoose.Schema(
    {
        id: { type: String },
        email: { type: String, unique: true, require: true },
        password: { type: String, require: true },
        name: { type: String, require: true },
        image: { type: String },
        role: { type: String },
    },
    { timestamps: true }
);

userSchema.plugin(paginate);

const User = mongoose.model('User', userSchema);

export default User;
