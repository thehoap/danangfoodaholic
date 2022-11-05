import expressAsyncHandler from 'express-async-handler';

const uploadImages = expressAsyncHandler(async (req, res) => {
    try {
        if (!req.files)
            return res.status(400).json({ message: 'Chưa có ảnh.' });
        const paths = req.files.map((image) => image.path);
        return res.status(201).json(paths);
    } catch (e) {
        res.status(500).json({ message: e });
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
