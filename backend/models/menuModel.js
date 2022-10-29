import mongoose from 'mongoose';

const menuSchema = mongoose.Schema(
    {
        id: { type: String },
        items: [
            {
                id: { type: String },
                image: { type: String },
                name: { type: String },
                currentPrice: { type: String },
                originalPrice: { type: String },
            },
        ],
    },
    { timestamps: true }
);

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
