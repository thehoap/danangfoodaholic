import express from 'express';
import { getMenu } from '../controllers/menuController.js';

const router = express.Router();

router.get('/:id', getMenu);

export default router;
