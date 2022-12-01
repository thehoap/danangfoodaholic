import StatusCodes from 'http-status-codes';

import Post from '../models/postModel.js';
import Restaurant from '../models/restaurantModel.js';
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
        populate: req.query.restaurantId ? 'user' : 'user restaurantId',
    });

    res.status(StatusCodes.OK).json(responseFormat(true, {}, posts));
};
/* 
    @route GET /posts/:id
    @access PRIVATE
*/
const getPostDetail = async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id)
        .lean()
        .sort({ createdAt: 'asc' })
        .populate('comments');

    const restaurant = await Restaurant.findById(post.restaurantId);
    restaurant.ratings = {
        space: [...restaurant.ratings.space, post.ratings.space],
        food: [...restaurant.ratings.food, post.ratings.food],
        hygiene: [...restaurant.ratings.hygiene, post.ratings.hygiene],
        service: [...restaurant.ratings.service, post.ratings.service],
        price: [...restaurant.ratings.price, post.ratings.price],
        average: [...restaurant.ratings.average, post.ratings.average],
    };
    await Restaurant.updateOne({ _id: post.restaurantId }, restaurant);

    res.status(StatusCodes.OK).json(responseFormat(true, {}, post));
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
    const id = req.params.id;
    const userId = req.body.userId;

    const post = await Post.findById(id);

    if (req.body.action) {
        const action = req.body.action;
        const index = post[action].indexOf(userId);
        if (index > -1) {
            post[action].splice(index, 1);
        } else {
            post[action].push(userId);
        }
    }

    await Post.updateOne({ _id: id }, post);

    res.status(StatusCodes.OK).json(responseFormat(true, {}, post));
};
/* 
    @route DELETE /posts
    @access PRIVATE
*/
const deletePost = async (req, res) => {
    res.json({ message: 'delete post' });
};

export { getPosts, getPostDetail, createPost, updatePost, deletePost };
