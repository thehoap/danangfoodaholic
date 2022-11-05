import express from 'express';
import {
    getRestaurants,
    getRestaurant,
} from '../controllers/restaurantController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getRestaurants);
router.get('/:id', protect, getRestaurant);

export default router;
