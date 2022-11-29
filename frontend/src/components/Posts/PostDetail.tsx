import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Comment as AntComment, Divider, Rate, Skeleton, Tag } from 'antd';
import { uniqBy } from 'lodash';

import { Comment, Dislike, Heart, Like } from 'assets/icons';
import Hashtag from 'components/Hashtag';
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
import { PostCategory } from 'components/PostCategories/styles';

interface IPostDetail {
    post: IPost;
    setHashtag: SetStateType<string>;
}

const dateFormat = 'DD/MM/YYYY hh:mm';

const PostDetail = ({ post, setHashtag }: IPostDetail) => {
    const {
        name: userName,
        userId,
        image: userImage,
    } = useAppSelector((state) => state.profile);

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
            createComment(values)
                .unwrap()
                .then((res: IResponseFormat<IComment>) => {
                    formik.resetForm();
                    const comment = res.data;
                    setNewComments((comments) => [...comments, { ...comment }]);
                });
        },
    });

    const [isLiked, setIsLiked] = useState<boolean>(() => {
        const isLiked = likes?.includes(userId);
        return isLiked;
    });
    const [showComment, setShowComment] = useState<boolean>(false);
    const [newComments, setNewComments] = useState<IComment[]>([]);

    const handleLike = () => {
        setIsLiked((liked) => !liked);
        updatePost({ body: { userId, action: 'likes' }, id });
    };

    const handleShowComment = () => {
        setShowComment(true);
    };

    const handleCreateComment = (e: KeyboardEventType<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
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
    console.log(comments?.length, newComments?.length);
    return (
        <StyledPostDetail>
            <section className="section section-header">
                <div>
                    <Profile
                        image={image}
                        title={name}
                        description={postTime}
                        size={52}
                    />
                    {is_recommend ? (
                        <Tag color="processing">Đề xuất</Tag>
                    ) : (
                        <Tag color="error">Không đề xuất</Tag>
                    )}
                </div>
                <Rate value={average} disabled allowHalf />
            </section>
            <section
                className="content"
                dangerouslySetInnerHTML={{ __html: content }}
            />
            <section className="section">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                et minima optio adipisci possimus labore ducimus culpa hic,
                quaerat illum, nostrum incidunt, ex delectus eaque obcaecati
                ipsam dignissimos ratione nulla?
            </section>
            <section className="section section-image">
                <ImagesPreview image={images[0]} images={images} />
            </section>
            <section className="section section-hashtag">
                {hashtags.map((hashtag, index) => (
                    <PostCategory
                        onClick={() => setHashtag(hashtag)}
                        key={index}
                    >
                        {hashtag}
                    </PostCategory>
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
                    {comments?.length} bình luận
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
                                content={content}
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
                                placeholder="Bạn nghĩ gì về bài viết này?"
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
