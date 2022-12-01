import { Col, Form, Row } from 'antd';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import Button from 'components/Button';
import InputNumber from 'components/InputNumber';
import Rating from 'components/Rating';
import { useAppSelector } from 'redux/hooks';
import Recommend from './Recommend';
import { StyledCreatePost } from './styles';
import Select from 'components/Select';
import ImagesUpload from 'components/ImagesUpload';
import { useUploadImagesMutation } from 'services/authAPI';
import { useCreatePostMutation } from 'services/postAPI';
import { textareaConvertHTML } from 'utils/input';
import TextArea from 'components/TextArea';
import { getAverage } from 'utils/caculate';
import { TAB } from 'constants/data';

const CreatePost = () => {
    const navigate = useNavigate();
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
        content: '',
        ratings_space: 0,
        ratings_food: 0,
        ratings_hygiene: 0,
        ratings_service: 0,
        ratings_price: 0,
        ratings_average: 0,
        is_recommend: true,
        total_people: 1,
        total_bill: 0,
        images: [],
        hashtags: [],
        comments: [],
        likes: [],
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
                ratings_average,
                total_people,
                total_bill,
                content,
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
                    average: getAverage([
                        ratings_space,
                        ratings_food,
                        ratings_hygiene,
                        ratings_service,
                        ratings_price,
                    ]),
                },
                total: {
                    people: total_people,
                    bill: total_bill,
                },
                content: textareaConvertHTML(content),
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
                handleNavigateView();
            });
        },
    });

    const handleNavigateView = () => {
        window.scrollTo(0, 0);
        navigate({
            search: `?tab=${TAB.VIEW}`,
        });
    };

    return (
        <StyledCreatePost>
            <Form
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={formik.handleSubmit}
            >
                <Row>
                    <Col span={16}>
                        <TextArea
                            formik={formik}
                            id="content"
                            name="content"
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            label="What do you think about this food stall?"
                            placeholder="Tell what you like/dislike, your favorite dishes, drinks.."
                        />
                        <Row>
                            <Col span={12}>
                                <Rating
                                    label="Space"
                                    formik={formik}
                                    name="ratings_space"
                                />
                                <Rating
                                    label="Food/Drink"
                                    formik={formik}
                                    name="ratings_food"
                                />
                                <Rating
                                    label="Service"
                                    formik={formik}
                                    name="ratings_service"
                                />
                                <Rating
                                    label="Price"
                                    formik={formik}
                                    name="ratings_price"
                                />
                                <Rating
                                    label="Hygiene"
                                    formik={formik}
                                    name="ratings_hygiene"
                                />
                            </Col>
                            <Col span={12}>
                                <Recommend
                                    formik={formik}
                                    name="is_recommend"
                                />
                                <Row>
                                    <Col span={12}>
                                        <InputNumber
                                            label="Quantity of people"
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
                                            label="Total money"
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
                                    label="Hashtags"
                                    name="hashtags"
                                    formik={formik}
                                    mode="tags"
                                    tokenSeparators={[' ']}
                                />
                            </Col>
                        </Row>
                        <ImagesUpload setImages={setImages} />
                        <Row className="btns">
                            <Button type="default" onClick={handleNavigateView}>
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={
                                    isLoadingUploadImages || isLoadingCreatePost
                                }
                            >
                                Post
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </StyledCreatePost>
    );
};

export default CreatePost;
