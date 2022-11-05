import expressAsyncHandler from 'express-async-handler';
import StatusCodes from 'http-status-codes';

import Restaurant from '../models/restaurantModel.js';
import Menu from '../models/menuModel.js';
import responseFormat from '../utils/responseFormat.js';

/* 
    @route GET /restaurants
    @access PRIVATE
*/
const getRestaurants = expressAsyncHandler(async (req, res) => {
    const restaurants = await Restaurant.find();
    res.status(StatusCodes.OK).json(responseFormat(true, {}, restaurants));
});

/* 
    @route GET /restaurant/:id
    @access PRIVATE
*/
const getRestaurant = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findOne({ id }).lean();
    const menu = await Menu.findOne({ id: restaurant.menuId });
    restaurant.menu = menu.items;

    res.status(StatusCodes.OK).json(responseFormat(true, {}, restaurant));
});

export { getRestaurants, getRestaurant };
