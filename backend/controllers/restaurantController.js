import expressAsyncHandler from 'express-async-handler';
import Restaurant from '../models/restaurantModel.js';

/* 
    @route GET /restaurants
    @access PRIVATE
*/
const getRestaurants = expressAsyncHandler(async (req, res) => {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
});

/* 
    @route POST /restaurants
    @access PRIVATE
*/
const createRestaurant = expressAsyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        throw new Error('miss name');
    }
    const restaurant = await Restaurant.create({ name: req.body.name });
    res.status(200).json(restaurant);
});
/* 
    @route PUT /restaurants/:id
    @access PRIVATE
*/
const updateRestaurant = expressAsyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    console.log(req.params.id);
    if (!restaurant) {
        res.status(400);
        throw new Error('Restaurant is not found.');
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedRestaurant);
});
/* 
    @route DELETE /restaurants/:id
    @access PRIVATE
*/
const deleteRestaurant = expressAsyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
        res.status(400);
        throw new Error('Restaurant is not found.');
    }

    await restaurant.remove();

    res.status(200).json({ id: req.params.id });
});

export { getRestaurants, createRestaurant, updateRestaurant, deleteRestaurant };
