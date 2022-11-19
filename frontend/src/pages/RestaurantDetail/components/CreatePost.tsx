import { Col, Form, Row } from 'antd';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import Button from 'components/Button';
import Input from 'components/Input';
import InputNumber from 'components/InputNumber';
import Rating from 'components/Rating';
import { useAppSelector } from 'redux/hooks';
import Recommend from './Recommend';
import { StyledCreatePost } from './styles';
import Select from 'components/Select';
import ImagesUpload from 'components/ImagesUpload';
import { useUploadImagesMutation } from 'services/commonAPI';
import { useCreatePostMutation } from 'services/postAPI';
import TextEditor from 'components/TextEditor';

const CreatePost = () => {
    const { id: restaurantId } = useParams();
    const { userId } = useAppSelector((state) => state.profile);

    const [
        uploadImages,
        { data: dataImages, isLoading: isLoadingUploadImages },
    ] = useUploadImagesMutation();
    const [createPost, { data: dataPost, isLoading: isLoadingCreatePost }] =
        useCreatePostMutation();

    const [images, setImages] = useState<FormData>();

    const initialValues = {
        id: '',
        restaurantId: restaurantId || '',
        user: userId || '',
        title: '',
        compliment: '',
        need_improve: '',
        ratings_space: 0,
        ratings_food: 0,
        ratings_hygiene: 0,
        ratings_service: 0,
        ratings_price: 0,
        is_recommend: false,
        total_people: 1,
        total_bill: 0,
        images: [],
        hashtags: [],
    };
    const validationSchema = yup.object().shape({});

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const {
                ratings_space,
                ratings_food,
                ratings_hygiene,
                ratings_service,
                ratings_price,
                total_people,
                total_bill,
                ...rest
            } = values;
            const postValue = {
                ...rest,
                ratings: {
                    space: ratings_space,
                    food: ratings_food,
                    hygiene: ratings_hygiene,
                    service: ratings_service,
                    price: ratings_price,
                },
                total: {
                    people: total_people,
                    bill: total_bill,
                },
            };

            if (images) {
                postValue.images = await uploadImages(images)
                    .then((res: any) => {
                        return res.data;
                    })
                    .catch((error: IError) => {
                        console.log(error.data.meta.message);
                    });
            }
            createPost(postValue).then(() => {
                formik.setValues(initialValues);
            });
        },
    });

    return (
        <StyledCreatePost>
            <Form
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={formik.handleSubmit}
            >
                <Row>
                    <Col span={16}>
                        <Input
                            label="Tiêu đề"
                            name="title"
                            formik={formik}
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                        <TextEditor
                            formik={formik}
                            name="compliment"
                            label="Bạn thích gì ở địa điểm này?"
                            placeholder="Bạn thích gì ở địa điểm này?"
                        />
                        <TextEditor
                            formik={formik}
                            name="need_improve"
                            label="Bạn muốn cải thiện điều gì?"
                            placeholder="Bạn muốn cải thiện điều gì?"
                        />
                    </Col>
                    <Col span={8}>
                        <Rating
                            label="Không gian"
                            formik={formik}
                            name="ratings_space"
                        />
                        <Rating
                            label="Món ăn"
                            formik={formik}
                            name="ratings_food"
                        />
                        <Rating
                            label="Phục vụ"
                            formik={formik}
                            name="ratings_service"
                        />
                        <Rating
                            label="Giá cả"
                            formik={formik}
                            name="ratings_price"
                        />
                        <Rating
                            label="Vệ sinh"
                            formik={formik}
                            name="ratings_hygiene"
                        />

                        <Recommend formik={formik} name="is_recommend" />
                        <Row>
                            <Col span={12}>
                                <InputNumber
                                    label="Số người"
                                    name="total_people"
                                    value={formik.values.total_people}
                                    onChange={(value) =>
                                        formik.setFieldValue(
                                            'total_people',
                                            value
                                        )
                                    }
                                    min={1}
                                />
                            </Col>
                            <Col span={12}>
                                <InputNumber
                                    label="Tổng tiền"
                                    name="total_bill"
                                    value={formik.values.total_bill}
                                    onChange={(value) =>
                                        formik.setFieldValue(
                                            'total_bill',
                                            value
                                        )
                                    }
                                    min={0}
                                    step={1000}
                                    addonAfter="VND"
                                />
                            </Col>
                        </Row>

                        <Select
                            label="Hash tags"
                            name="hashtags"
                            formik={formik}
                            mode="tags"
                            tokenSeparators={[' ']}
                        />
                    </Col>
                </Row>

                <ImagesUpload setImages={setImages} />
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoadingUploadImages || isLoadingCreatePost}
                >
                    Đăng bài
                </Button>
            </Form>
        </StyledCreatePost>
    );
};

export default CreatePost;
