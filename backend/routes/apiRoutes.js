import express from 'express';
import restaurantRouter from './restaurantRoutes.js';
import menuRouter from './menuRoutes.js';
import userRouter from './userRoutes.js';

const baseRouter = express.Router();

baseRouter.use('/restaurants', restaurantRouter);
baseRouter.use('/menus', menuRouter);
baseRouter.use('/users', userRouter);

export default baseRouter;
