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

    const restaurants = await Restaurant.find({ published: true }, null, {
        limit: 200,
    });

    const posts = await Post.find({ published: true }, null, {
        limit,
    }).populate('user');

    const hashtags = posts.reduce((prev, current) => {
        const result = unionBy(prev, current.hashtags);
        return result;
    }, []);

    res.status(StatusCodes.OK).json(
        responseFormat(true, {}, { restaurants, posts, hashtags })
    );
};

export { uploadImages, getTrending };
