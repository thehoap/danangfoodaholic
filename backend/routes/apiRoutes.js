import express from 'express';
import restaurantRouter from './restaurantRoutes.js';
import userRouter from './userRoutes.js';

const baseRouter = express.Router();

baseRouter.use('/restaurants', restaurantRouter);
baseRouter.use('/users', userRouter);

export default baseRouter;
