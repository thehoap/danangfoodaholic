import expressAsyncHandler from 'express-async-handler';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/userModel.js';
/* 
    @route POST /users/register
    @access PUBLIC
*/
const registerUser = expressAsyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        res.status(400);
        throw new Error('Vui lòng nhập đầy đủ thông tin!');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error('Tài khoản đã tồn tại. Vui lòng nhập email khác!');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const id = uuidv4();

    const user = await User.create({
        id,
        email,
        password: hashedPassword,
        name,
    });

    if (user) {
        res.status(201).json({
            id,
            email,
            name,
            token: generateToken(id),
        });
    } else {
        res.status(400);
        throw new Error('Tài khoản không hợp lệ.');
    }
});
/* 
    @route POST /users/login
    @access PUBLIC
*/
const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Bạn chưa nhập tên đăng nhập hoặc mật khẩu.');
    }

    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error('Tài khoản không tồn tại. Vui lòng kiểm tra lại!');
    } else {
        if (await bcrypt.compare(password, user.password)) {
            res.json({
                id: user.id,
                email: user.email,
                name: user.name,
                token: generateToken(user.id),
            });
        } else {
            res.status(400);
            throw new Error('Mật khẩu không đúng. Vui lòng nhập lại!');
        }
    }
});
/* 
    @route GET /users/profile
    @access PRIVATE
*/

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export { registerUser, loginUser };
