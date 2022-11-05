import { Router } from 'express';

import upload from '../config/cloudinary.js';
import { uploadImages } from '../controllers/cloudinaryController.js';

const router = Router();

router.post('/upload-images', upload.array('images'), uploadImages);

export default router;
