import { Router } from 'express';

import upload from '../config/cloudinary.js';
import { uploadImages, getTrending } from '../controllers/commonController.js';

const router = Router();

router.get('/trending', getTrending);
router.post('/upload-images', upload.array('images'), uploadImages);

export default router;
