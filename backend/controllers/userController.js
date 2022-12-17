import expressAsyncHandler from 'express-async-handler';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import StatusCodes from 'http-status-codes';

import User from '../models/userModel.js';
import responseFormat from '../utils/responseFormat.js';
/* 
    @route POST /users/register
    @access PUBLIC
*/
const registerUser = expressAsyncHandler(async (req, res) => {
    const { email, password, name, image } = req.body;
    if (!email || !password || !name) {
        res.status(StatusCodes.BAD_REQUEST).json(
            responseFormat(
                false,
                {
                    message: 'Vui lòng nhập đầy đủ thông tin!',
                },
                {}
            )
        );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(StatusCodes.BAD_REQUEST).json(
            responseFormat(
                false,
                {
                    message: 'Tài khoản đã tồn tại. Vui lòng nhập email khác!',
                },
                {}
            )
        );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const id = uuidv4();

    const user = await User.create({
        image,
        id,
        email,
        password: hashedPassword,
        name,
    });

    if (user) {
        res.status(StatusCodes.CREATED).json(
            responseFormat(
                true,
                {},
                {
                    image,
                    id,
                    email,
                    name,
                    token: generateToken(id),
                }
            )
        );
    } else {
        res.status(StatusCodes.BAD_REQUEST).json(
            responseFormat(false, { message: 'Tài khoản không hợp lệ.' }, {})
        );
    }
});
/* 
    @route POST /users/login
    @access PUBLIC
*/
const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json(
            responseFormat(
                false,
                { message: 'Bạn chưa nhập tên đăng nhập hoặc mật khẩu.' },
                {}
            )
        );
    }

    const user = await User.findOne({ email });
    if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json(
            responseFormat(
                false,
                { message: 'Tài khoản không tồn tại. Vui lòng kiểm tra lại!' },
                {}
            )
        );
    } else {
        if (await bcrypt.compare(password, user.password)) {
            res.status(StatusCodes.OK).json(
                responseFormat(
                    true,
                    {},
                    {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        role: user.role,
                        token: generateToken(user._id),
                    }
                )
            );
        } else {
            res.status(StatusCodes.BAD_REQUEST).json(
                responseFormat(
                    false,
                    { message: 'Mật khẩu không đúng. Vui lòng nhập lại!' },
                    {}
                )
            );
        }
    }
});
/* 
    @route GET /users/profile
    @access PRIVATE
*/
const getProfile = expressAsyncHandler(async (req, res) => {
    const { _id, email, name, image, role } = req.user;

    res.status(StatusCodes.OK).json(
        responseFormat(true, {}, { id: _id, email, name, image, role })
    );
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export { registerUser, loginUser, getProfile };
