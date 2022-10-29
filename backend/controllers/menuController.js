import expressAsyncHandler from 'express-async-handler';
import Menu from '../models/menuModel.js';

/* 
    @route GET /menu/:id
    @access PRIVATE
*/
const getMenu = expressAsyncHandler(async (req, res) => {
    const menu = await Menu.findOne({ id: req.params.id });
    res.status(200).json(menu);
});

export { getMenu };
