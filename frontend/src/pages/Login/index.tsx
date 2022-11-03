import { useFormik } from 'formik';
import * as yup from 'yup';

import { StyledLogin } from './styles';
import * as REGEX from 'constants/regex';
import * as ERRORS from 'constants/errors';
import Input from 'components/Input';
import { Button, Form, Typography } from 'antd';
import { useLoginMutation } from 'services/authAPI';
import { useState } from 'react';

const Login = () => {
    const [error, setError] = useState<string>('');
    const [login] = useLoginMutation();

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
                .then((data: ILoginResponse) => {
                    localStorage.setItem('token', data.token);
                })
                .catch((error: IError) => {
                    setError(error.data.message);
                });
        },
    });
    return (
        <StyledLogin>
            <p>Trang review ĐÀ NẴNG</p>
            <Form
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={formik.handleSubmit}
            >
                <Input
                    label="Email"
                    name="email"
                    formik={formik}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />

                <Input
                    label="Password"
                    formik={formik}
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                {error && (
                    <Typography.Text type="danger">{error}</Typography.Text>
                )}
                <Button type="primary" htmlType="submit">
                    Đăng nhập
                </Button>
            </Form>
        </StyledLogin>
    );
};

export default Login;
