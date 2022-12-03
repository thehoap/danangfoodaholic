import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Comment as AntComment, Divider, Popover, Skeleton } from 'antd';
import { isInteger, uniqBy } from 'lodash';

import { Comment, Heart } from 'assets/icons';
import Profile from 'components/Profile';
import TextArea from 'components/TextArea';
import { useAppSelector } from 'redux/hooks';
import {
    useCreateCommentMutation,
    useLazyGetPostDetailQuery,
    useUpdatePostMutation,
} from 'services/postAPI';
import { timestampToDate } from 'utils/dateFormat';
import { StyledPostDetail } from './styles';
import * as ERRORS from 'constants/errors';
import * as REGEX from 'constants/regex';
import ImagesPreview from 'components/ImagesPreview';
import Rate from 'components/Rate';
import { Link, useSearchParams } from 'react-router-dom';
import { PATH } from 'constants/path';
import RestaurantCard from 'pages/Restaurants/components/RestaurantCard';
import { textareaConvertHTML } from 'utils/input';
import PostCategory from 'components/PostCategories/PostCategory';
import { roundToHalf } from 'utils/calculate';

interface IPostDetail {
    post: IPost;
}

const dateFormat = 'DD/MM/YYYY hh:mm';

const PostDetail = ({ post }: IPostDetail) => {
    const {
        name: userName,
        userId,
        image: userImage,
    } = useAppSelector((state) => state.profile);
    const [searchParams, _] = useSearchParams();

    const _hashtag = searchParams.get('hashtag');
    const [updatePost] = useUpdatePostMutation();
    const [createComment] = useCreateCommentMutation();
    const [getPostDetail] = useLazyGetPostDetailQuery();

    const {
        id,
        content,
        user: { image, name },
        images,
        hashtags,
        createdAt,
        likes,
        ratings: { average },
        comments,
        is_recommend,
        restaurantId,
    } = post;
    const postTime = timestampToDate(dateFormat, createdAt);
    const formik = useFormik({
        validateOnChange: false,
        initialValues: {
            postId: id,
            user: { id: userId, name: userName, image: userImage },
            content: '',
        },
        validationSchema: yup.object().shape({
            content: yup
                .string()
                .required(ERRORS.COMMENT.required)
                .matches(REGEX.NO_SPACES_ONLY, ERRORS.COMMENT.required),
        }),
        onSubmit: (values: IComment) => {
            values = {
                ...values,
                content: textareaConvertHTML(values.content),
            };

            createComment(values)
                .unwrap()
                .then((res: IResponseFormat<IComment>) => {
                    formik.resetForm();
                    const comment = res.data;
                    setNewComments((comments) => [...comments, { ...comment }]);
                    setCountNewComments((count) => count + 1);
                });
        },
    });

    const [isLiked, setIsLiked] = useState<boolean>(() => {
        const isLiked = likes?.includes(userId);
        return isLiked;
    });
    const [showComment, setShowComment] = useState<boolean>(false);
    const [newComments, setNewComments] = useState<IComment[]>([]);
    const [countNewComments, setCountNewComments] = useState<number>(
        comments?.length
    );

    const handleLike = () => {
        setIsLiked((liked) => !liked);
        updatePost({ body: { userId, action: 'likes' }, id });
    };

    const handleShowComment = () => {
        setShowComment(true);
    };

    const handleCreateComment = (e: KeyboardEventType<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            formik.submitForm();
        }
    };

    const handleViewPreviousComments = () => {
        getPostDetail(id)
            .unwrap()
            .then((res: IResponseFormat<IPost>) => {
                setNewComments((comments) => {
                    if (Array.isArray(res.data.comments)) {
                        return uniqBy(
                            res.data.comments.concat(comments),
                            '_id'
                        );
                    }
                    return [...comments];
                });
            });
    };

    const profileTitle = (
        <p>
            {name}
            {typeof restaurantId !== 'string' && (
                <>
                    <span>
                        {is_recommend ? ' recommends ' : " doesn't recommend "}
                    </span>
                    <Popover
                        content={<RestaurantCard restaurant={restaurantId} />}
                        id="popover-restaurant-card"
                    >
                        <Link
                            to={`${PATH.RESTAURANTS.path}/${restaurantId?._id}`}
                        >
                            {restaurantId?.name}
                        </Link>
                    </Popover>
                </>
            )}
        </p>
    );

    return (
        <StyledPostDetail>
            <section className="section section-header">
                <div>
                    <Profile
                        image={image}
                        title={profileTitle}
                        description={postTime}
                        size={52}
                    />
                </div>
                <div>
                    <span className="rating-average"> {average}</span>
                    <Rate
                        value={
                            isInteger(average) ? average : roundToHalf(average)
                        }
                        exactValue={average}
                        disabled
                        allowHalf
                    />
                </div>
            </section>
            <section
                className="section section-content"
                dangerouslySetInnerHTML={{ __html: content }}
            />
            <section className="section section-image">
                <ImagesPreview width={150} images={images} />
            </section>
            <section className="section section-hashtag">
                {hashtags.map((hashtag, index) => (
                    <PostCategory
                        key={index}
                        hashtag={hashtag}
                        active={hashtag === _hashtag}
                    />
                ))}
            </section>
            <Divider />
            <section className="section section-interaction">
                <span onClick={handleLike}>
                    <Heart className={`like-icon ${isLiked ? 'active' : ''}`} />
                    {likes?.length} yêu thích
                </span>
                <span onClick={handleShowComment}>
                    <Comment />
                    {countNewComments} bình luận
                </span>
            </section>
            {showComment && (
                <div className="comment-box">
                    {comments?.length > newComments?.length && (
                        <a
                            onClick={handleViewPreviousComments}
                            className="comment-preview"
                        >
                            Xem các bình luận trước
                        </a>
                    )}
                    {newComments?.length > 0 &&
                        newComments.map(({ content, user, createdAt, _id }) => (
                            <AntComment
                                author={user.name}
                                avatar={<img src={user.image} alt="" />}
                                content={
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: content,
                                        }}
                                    />
                                }
                                datetime={
                                    <span>
                                        {timestampToDate(dateFormat, createdAt)}
                                    </span>
                                }
                                key={_id}
                            />
                        ))}
                    <Profile
                        image={userImage}
                        size={36}
                        title={
                            <TextArea
                                label=""
                                id="content"
                                name="content"
                                formik={formik}
                                value={formik.values.content}
                                onChange={formik.handleChange}
                                onKeyDown={handleCreateComment}
                                placeholder="Write a comment... "
                                style={{ height: '36px', resize: 'none' }}
                            />
                        }
                    />
                </div>
            )}
        </StyledPostDetail>
    );
};

export const SkeletonPostDetail = () => {
    return (
        <StyledPostDetail>
            <section className="section section-header">
                <div>
                    <Skeleton.Avatar active />
                    <Skeleton.Input active />
                </div>
            </section>
            <section className="section">
                <Skeleton paragraph={{ rows: 4 }} title={false} />
            </section>
            <section className="section section-image">
                <Skeleton.Image active />
                <Skeleton.Image active />
                <Skeleton.Image active />
                <Skeleton.Image active />
                <Skeleton.Image active />
                <Skeleton.Image active />
            </section>
            <section className="section section-hashtag">
                <Skeleton.Button active />
            </section>
            <Divider />
            <section className="section section-interaction">
                <span>
                    <Skeleton.Input active />
                </span>
                <span>
                    <Skeleton.Input active />
                </span>
            </section>
        </StyledPostDetail>
    );
};

export default PostDetail;
