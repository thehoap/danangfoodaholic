import express from 'express';
import {
    getPosts,
    createPost,
    deletePost,
    updatePost,
} from '../controllers/postController.js';
import { schemas, validate } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', validate(schemas.createPost), createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
