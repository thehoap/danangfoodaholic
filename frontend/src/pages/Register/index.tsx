import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Form, Typography } from 'antd';

import { StyledRegister } from './styles';
import * as REGEX from 'constants/regex';
import * as ERRORS from 'constants/errors';
import Input from 'components/Input';
import { useRegisterMutation } from 'services/authAPI';
import { PATH } from 'constants/path';
import ImageUpload from 'components/ImageUpload';
import { useUploadImagesMutation } from 'services/authAPI';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';

const Register = () => {
    const navigate = useNavigate();

    const [register, { isLoading: isLoadingRegister }] = useRegisterMutation();
    const [
        uploadImages,
        { data: dataImages, isLoading: isLoadingUploadImages },
    ] = useUploadImagesMutation();

    const [error, setError] = useState<string>('');
    const [images, setImages] = useState<FormData>();

    const initialValues = {
        image: '',
        name: '',
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
        onSubmit: async (values: IRegister) => {
            if (images) {
                values.image = await uploadImages(images)
                    .then((res: any) => {
                        return res.data[0];
                    })
                    .catch((error: IError) => {
                        setError(error.data.meta.message);
                    });
            }
            register(values)
                .unwrap()
                .then((res: IResponseFormat<IRegisterResponse>) => {
                    navigate('/login');
                })
                .catch((error: IError) => {
                    setError(error.data.meta.message);
                });
        },
    });

    return (
        <StyledRegister>
            <Form
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={formik.handleSubmit}
            >
                <p>Trang review ĐÀ NẴNG</p>
                <ImageUpload label="Ảnh đại diện" setImages={setImages} />

                <Input
                    label="Tên người dùng"
                    name="name"
                    formik={formik}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />

                <Input
                    label="Email"
                    name="email"
                    formik={formik}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    autoComplete="off"
                />

                <Input
                    label="Mật khẩu"
                    formik={formik}
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />

                <Input
                    label="Xác nhận mật khẩu"
                    type="password"
                    formik={formik}
                    name="confirmPassword"
                />

                {error && (
                    <Typography.Text type="danger">{error}</Typography.Text>
                )}
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoadingRegister || isLoadingUploadImages}
                >
                    Đăng ký
                </Button>
            </Form>
        </StyledRegister>
    );
};

export default Register;
