import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { StyledLogin } from './styles';
import * as REGEX from 'constants/regex';
import * as ERRORS from 'constants/errors';
import Input from 'components/Input';
import { Button, Form, Typography } from 'antd';
import { useLoginMutation } from 'services/authAPI';
import { PATH } from 'constants/path';

const Login = () => {
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const [error, setError] = useState<string>('');

    const initialValues = {
        email: '',
        password: '',
    };
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .trim()
            .required(ERRORS.EMAIL.required)
            .matches(REGEX.EMAIL, ERRORS.EMAIL.matches),
        password: yup.string().trim().required(ERRORS.PASSWORD.required),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values: ILogin) => {
            login(values)
                .unwrap()
                .then((res: IResponseFormat<ILoginResponse>) => {
                    localStorage.setItem('token', res.data.token);
                    navigate('/');
                })
                .catch((error: IError) => {
                    setError(error.data.meta.message);
                });
        },
    });
    return (
        <StyledLogin>
            <Form
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={formik.handleSubmit}
            >
                <p>Trang review ĐÀ NẴNG</p>
                <Input
                    label="Email"
                    name="email"
                    formik={formik}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />

                <Input
                    label="Mật khẩu"
                    formik={formik}
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                {error && (
                    <Typography.Text type="danger">{error}</Typography.Text>
                )}
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Đăng nhập
                </Button>
                <Typography.Text type="warning">
                    Bạn chưa có tài khoản?
                    <NavLink to={PATH.REGISTER.path}> Đăng ký ngay.</NavLink>
                </Typography.Text>
            </Form>
        </StyledLogin>
    );
};

export default Login;
