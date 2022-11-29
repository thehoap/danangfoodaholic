import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const restaurantSchema = mongoose.Schema(
    {
        name: { type: String },
        link: { type: String },
        image: { type: String },
        type: { type: String },
        address: { type: String },
        id: { type: String },
        districtId: { type: Number },
        wardId: { type: Number },
        menuId: { type: String },
        time: { type: String },
        priceRange: { type: String },
        coordinate: {
            lat: { type: String },
            long: { type: String },
        },
        ratings: { type: Number },
    },
    {
        timestamps: true,
    }
);

restaurantSchema.plugin(paginate);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
