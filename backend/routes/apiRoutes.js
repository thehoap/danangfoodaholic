import express from 'express';
import restaurantRouter from './restaurantRoutes.js';
import userRouter from './userRoutes.js';
import commonRouter from './commonRoutes.js';
import postRouter from './postRoutes.js';
import { protect } from '../middleware/authMiddleware.js';

const baseRouter = express.Router();

baseRouter.use('/restaurants', protect, restaurantRouter);
baseRouter.use('/users', userRouter);
baseRouter.use('/commons', commonRouter);
baseRouter.use('/posts', protect, postRouter);

export default baseRouter;
