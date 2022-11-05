import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 } from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: v2,
    params: async (req, file) => {
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        const fileNameWithExtensionNameRemoved = file.originalname.replace(
            /\.[^/.]+$/,
            ''
        );

        return {
            folder: process.env.CLOUDINARY_FOLDER,
            format: 'png',
            public_id:
                fileNameWithExtensionNameRemoved + '_' + timestamp.toString(),
        };
    },
});

const fileFilter = (req, file, done) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        done(null, true);
    } else {
        done({ message: 'Unsupported file' }, false);
    }
};

const upload = multer({
    storage,
    fileFilter,
});

export default upload;
