import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        id: { type: String },
        email: { type: String, unique: true, require: true },
        password: { type: String, require: true },
        name: { type: String, require: true },
        image: { type: String },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
