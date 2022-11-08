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
    let page = 1,
        limit = 10,
        query = {};

    if (req.query.page) page = req.query.page.toString();
    if (req.query.limit) limit = req.query.limit.toString();
    if (req.query.districtId)
        query.districtId = Number.parseInt(req.query.districtId.toString());
    if (req.query.type) query.type = req.query.type.toString();
    if (req.query.searchTerm) {
        const regex = new RegExp(req.query.searchTerm, 'i');
        query = {
            $and: [
                { $or: [{ name: regex }, { address: regex }] },
                { ...query },
            ],
        };
    }

    const restaurants = await Restaurant.paginate(query, {
        page,
        limit,
        lean: true,
        // sort: '-createdAt',
    });
    res.status(StatusCodes.OK).json(responseFormat(true, {}, restaurants));
});

/* 
    @route GET /restaurant/:id
    @access PRIVATE
*/
const getRestaurant = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id).lean();
    const menu = await Menu.findOne({ id: restaurant.menuId });
    restaurant.menu = menu.items;

    res.status(StatusCodes.OK).json(responseFormat(true, {}, restaurant));
});

export { getRestaurants, getRestaurant };
