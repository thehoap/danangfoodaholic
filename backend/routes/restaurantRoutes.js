import express from 'express';
import {
    getRestaurants,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
} from '../controllers/restaurantController.js';

const router = express.Router();

router.get('/', getRestaurants);

router.post('/', createRestaurant);

router.put('/:id', updateRestaurant);

router.delete('/:id', deleteRestaurant);

export default router;
