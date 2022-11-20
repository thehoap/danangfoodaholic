import express from 'express';
import {
    getComments,
    createComment,
    // deletePost,
    // updatePost,
} from '../controllers/commentController.js';
import { schemas, validate } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.get('/', getComments);
router.post('/', createComment);
// router.put('/:id', updatePost);
// router.delete('/:id', deletePost);

export default router;
