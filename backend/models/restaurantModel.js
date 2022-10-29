import mongoose from 'mongoose';

const restaurantSchema = mongoose.Schema(
    {
        name: { type: String },
        // link: { type: String },
        // image: { type: String },
        // type: { type: String },
        // address: { type: String },
        // id: { type: String },
        // districtId: { type: Number },
        // wardId: { type: Number },
        // menuId: { type: String },
        // time: { type: String },
        // priceRange: { type: String },
    },
    {
        timestamps: true,
    }
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
