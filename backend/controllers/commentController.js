import StatusCodes from 'http-status-codes';

import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';
import responseFormat from '../utils/responseFormat.js';

/* 
    @route GET /comments
    @access PRIVATE
*/
const getComments = async (req, res) => {
    let page = 1,
        limit = 10,
        query = {};

    if (req.query.page) page = req.query.page.toString();
    if (req.query.limit) limit = req.query.limit.toString();
    if (req.query.postId) query.postId = req.query.postId.toString();
};
/* 
    @route POST /comments
    @access PRIVATE
*/
const createComment = async (req, res) => {
    const { postId, user, content } = req.body;
    const newComment = await Comment.create({ user, content });
    const post = await Post.findById(postId);
    post.comments.push(newComment._id);

    await Post.updateOne({ _id: postId }, post);
    if (newComment) {
        res.status(StatusCodes.CREATED).json(
            responseFormat(true, {}, newComment)
        );
    } else {
        res.status(StatusCodes.BAD_REQUEST).json(
            responseFormat(false, { message: 'Bình luận không hợp lệ.' }, {})
        );
    }
};
export { getComments, createComment };
