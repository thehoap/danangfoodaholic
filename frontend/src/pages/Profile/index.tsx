import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Col, Form, Row, Typography } from 'antd';

import MainLayout from 'layouts/MainLayout';
import { useAppSelector } from 'redux/hooks';
import * as REGEX from 'constants/regex';
import * as ERRORS from 'constants/errors';
import Input from 'components/Input';
import Button from 'components/Button';
import { useRegisterMutation } from 'services/authAPI';
import ImageUpload from 'components/ImageUpload';
import { useUploadImagesMutation } from 'services/authAPI';
import { Email, Password, User } from 'assets/icons';

const Profile = () => {
    const navigate = useNavigate();

    const [register, { isLoading: isLoadingRegister }] = useRegisterMutation();
    const [
        uploadImages,
        { data: dataImages, isLoading: isLoadingUploadImages },
    ] = useUploadImagesMutation();

    const { id, name, email, image } = useAppSelector((state) => state.profile);

    const [error, setError] = useState<string>('');
    const [images, setImages] = useState<FormData>();

    const initialValues = {
        image,
        name,
        email,
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
        enableReinitialize: true,
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
    console.log(formik.values);
    return (
        <MainLayout>
            <Form
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={formik.handleSubmit}
            >
                <ImageUpload label="" setImages={setImages} imageUrl={image} />

                <Input
                    label="Username"
                    name="name"
                    formik={formik}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    prefix={<User />}
                />

                <Input
                    label="Email"
                    name="email"
                    formik={formik}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    autoComplete="off"
                    prefix={<Email />}
                />

                <Row gutter={24}>
                    <Col span={12}>
                        <Input
                            label="Password"
                            formik={formik}
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            prefix={<Password />}
                        />
                    </Col>
                    <Col span={12}>
                        <Input
                            label="Comfirm password"
                            type="password"
                            formik={formik}
                            name="confirmPassword"
                            prefix={<Password />}
                        />
                    </Col>
                </Row>

                {error && (
                    <Typography.Text type="danger">{error}</Typography.Text>
                )}

                {/* <Row gutter={4}>
                    <Col span={12}>
                        <Button
                            type="default"
                            onClick={() => navigate(PATH.LOGIN.path)}
                        >
                            Back to login
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoadingRegister || isLoadingUploadImages}
                        >
                            Profile
                        </Button>
                    </Col>
                </Row> */}
            </Form>
        </MainLayout>
    );
};

export default Profile;
