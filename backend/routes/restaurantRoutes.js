import express from 'express';
import {
    getRestaurants,
    getRestaurant,
} from '../controllers/restaurantController.js';

const router = express.Router();

router.get('/', getRestaurants);
router.get('/:id', getRestaurant);

export default router;
