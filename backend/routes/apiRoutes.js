import express from 'express';
import restaurantRouter from './restaurantRoutes.js';
import userRouter from './userRoutes.js';
import commonRouter from './cloudinaryRoutes.js';

const baseRouter = express.Router();

baseRouter.use('/restaurants', restaurantRouter);
baseRouter.use('/users', userRouter);
baseRouter.use('/commons', commonRouter);

export default baseRouter;
