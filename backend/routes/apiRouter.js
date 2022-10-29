import express from 'express';
import restaurantRouter from './restaurantRoutes.js';
import menuRouter from './menuRoutes.js';

const baseRouter = express.Router();

baseRouter.use('/restaurants', restaurantRouter);
baseRouter.use('/menus', menuRouter);

export default baseRouter;
