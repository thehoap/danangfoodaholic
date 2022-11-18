import StatusCodes from 'http-status-codes';

import Post from '../models/postModel.js';
import responseFormat from '../utils/responseFormat.js';

/* 
    @route GET /posts
    @access PRIVATE
*/
const getPosts = async (req, res) => {
    let page = 1,
        limit = 10,
        query = {};

    if (req.query.page) page = req.query.page.toString();
    if (req.query.limit) limit = req.query.limit.toString();
    if (req.query.restaurantId)
        query.restaurantId = req.query.restaurantId.toString();
    if (req.query.hashtag) {
        query = {
            $and: [
                { hashtags: { $all: [req.query.hashtag.toString()] } },
                { ...query },
            ],
        };
    }

    const posts = await Post.paginate(query, {
        page,
        limit,
        lean: true,
        sort: { createdAt: 'desc' },
        populate: 'user',
    });

    res.status(StatusCodes.OK).json(responseFormat(true, {}, posts));
};
/* 
    @route POST /posts
    @access PRIVATE
*/
const createPost = async (req, res) => {
    const post = await Post.create(req.body);

    if (post) {
        res.status(StatusCodes.CREATED).json(responseFormat(true, {}, post));
    } else {
        res.status(StatusCodes.BAD_REQUEST).json(
            responseFormat(false, { message: 'Bài đăng không hợp lệ.' }, {})
        );
    }
};
/* 
    @route PUT /posts
    @access PRIVATE
*/
const updatePost = async (req, res) => {
    res.json({ message: 'update post' });
};
/* 
    @route DELETE /posts
    @access PRIVATE
*/
const deletePost = async (req, res) => {
    res.json({ message: 'delete post' });
};

export { getPosts, createPost, updatePost, deletePost };
