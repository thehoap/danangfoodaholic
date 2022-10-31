import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = expressAsyncHandler(async (req, res, next) => {
    const authorization = req.headers.authorization;
    let token;

    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1];

            //Verify token
            const decoded = jwt.decode(token, process.env.JWT_SECRET);

            //Get user from the token
            req.user = await User.findOne({ id: decoded.id }).select(
                '-password'
            );

            next();
        } catch (error) {
            res.status(401);
            throw new Error(
                'Vui lòng đăng nhập trước khi truy cập vào trang này!'
            );
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Vui lòng đăng nhập trước khi truy cập vào trang này!');
    }
});

export { protect };
