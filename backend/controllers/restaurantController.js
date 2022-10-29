import expressAsyncHandler from 'express-async-handler';

/* 
    @route GET /restaurants
    @access PRIVATE
*/
const getRestaurants = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get restaurants' });
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
    res.status(200).json({ message: 'Create restaurants' });
});
/* 
    @route PUT /restaurants/:id
    @access PRIVATE
*/
const updateRestaurant = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get restaurants ${req.params.id}` });
});
/* 
    @route DELETE /restaurants/:id
    @access PRIVATE
*/
const deleteRestaurant = expressAsyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete restaurants ${req.params.id}` });
});

export { getRestaurants, createRestaurant, updateRestaurant, deleteRestaurant };
