import StatusCodes from 'http-status-codes';
import ld from 'lodash';

import expressAsyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
import Restaurant from '../models/restaurantModel.js';
import responseFormat from '../utils/responseFormat.js';

const { unionBy } = ld;
/* 
    @route POST /commons/upload-images
    @access PUBLIC
*/
const uploadImages = expressAsyncHandler(async (req, res) => {
    try {
        if (!req.files)
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(responseFormat(false, { message: 'Chưa có ảnh.' }, {}));
        const paths = req.files.map((image) => image.path);
        return res.status(StatusCodes.CREATED).json(paths);
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            responseFormat(false, { message: e }, {})
        );
    }
});

// const deleteImage = expressAsyncHandler(async (req, res) => {
//     try {
//         v2.uploader.destroy('review/92KXS9Q_1667643231683');
//     } catch (error) {
//         res.status(500).json({ message: e });
//     }
// });

/* 
    @route GET /commons/trending
    @access PRIVATE
*/
const getTrending = async (req, res) => {
    let page = 1,
        limit = 10,
        query = {};

    const _restaurants = await Restaurant.find({}, null, {
        limit: 200,
        sort: { name: 1 },
    }).lean();
    const restaurants = [];
    _restaurants.forEach(async (restaurant) => {
        const posts = await Post.find({ restaurantId: restaurant._id }).lean();
        let ratings = {
            space: [],
            food: [],
            hygiene: [],
            service: [],
            price: [],
            average: [],
        };
        posts.forEach((post) => {
            ratings = {
                ...ratings,
                space: ratings.space.concat(post.ratings.space),
                food: ratings.food.concat(post.ratings.food),
                hygiene: ratings.hygiene.concat(post.ratings.hygiene),
                service: ratings.service.concat(post.ratings.service),
                price: ratings.price.concat(post.ratings.price),
                average: ratings.average.concat(post.ratings.average),
            };
        });
        restaurants.push({ ...restaurant, ratings });
    });

    const _posts = await Post.find({}, null, {
        limit: 50,
    })
        .populate('user')
        .sort({ likes: -1 });
    const posts = _posts.slice(0, 10);
    const hashtags = _posts.reduce((prev, current) => {
        const result = unionBy(prev, current.hashtags);
        return result;
    }, []);

    res.status(StatusCodes.OK).json(
        responseFormat(true, {}, { restaurants, posts, hashtags })
    );
};

export { uploadImages, getTrending };
