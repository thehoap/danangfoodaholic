import { Router } from 'express';

import upload from '../config/cloudinary.js';
import { uploadImages, getTrending } from '../controllers/commonController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/trending', protect, getTrending);
router.post('/upload-images', upload.array('images'), uploadImages);

export default router;
