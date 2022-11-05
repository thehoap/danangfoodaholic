import expressAsyncHandler from 'express-async-handler';
import StatusCodes from 'http-status-codes';

/* 
    @route POST /commons/upload-images
    @access PRIVATE
*/
const uploadImages = expressAsyncHandler(async (req, res) => {
    try {
        if (!req.files)
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: 'Chưa có ảnh.' });
        const paths = req.files.map((image) => image.path);
        return res.status(StatusCodes.CREATED).json(paths);
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e });
    }
});

// const deleteImage = expressAsyncHandler(async (req, res) => {
//     try {
//         v2.uploader.destroy('review/92KXS9Q_1667643231683');
//     } catch (error) {
//         res.status(500).json({ message: e });
//     }
// });

export { uploadImages };
