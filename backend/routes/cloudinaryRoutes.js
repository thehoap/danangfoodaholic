import { Router } from 'express';

import upload from '../config/cloudinary.js';
import { uploadImages } from '../controllers/cloudinaryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/upload-images', protect, upload.array('images'), uploadImages);

export default router;
