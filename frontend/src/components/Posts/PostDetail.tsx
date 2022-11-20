import * as yup from 'yup';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Comment as AntComment } from 'antd';

import { Comment, Like } from 'assets/icons';
import Hashtag from 'components/Hashtag';
import Profile from 'components/Profile';
import TextArea from 'components/TextArea';
import { useAppSelector } from 'redux/hooks';
import {
    useCreateCommentMutation,
    useUpdatePostMutation,
} from 'services/postAPI';
import { timestampToDate } from 'utils/dateFormat';
import { StyledPostDetail } from './styles';
import * as ERRORS from 'constants/errors';
import * as REGEX from 'constants/regex';

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

    const [updatePost] = useUpdatePostMutation();
    const [createComment] = useCreateCommentMutation();

    const {
        id,
        title,
        compliment,
        need_improve,
        user: { image, name },
        images,
        hashtags,
        createdAt,
        likes,
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
    useEffect(() => {
        console.log(newComments);
    }, [newComments.length]);

    return (
        <StyledPostDetail>
            <Profile image={image} title={name} description={postTime} />
            <h1 className="title">{title}</h1>
            <h2 className="compliment">Điều tôi thích ở địa điểm này</h2>
            <span dangerouslySetInnerHTML={{ __html: compliment }}></span>
            <h2 className="compliment">Những điều cần cải thiện</h2>
            <span dangerouslySetInnerHTML={{ __html: need_improve }}></span>
            {images.map((image, index) => (
                <img
                    src={image}
                    alt=""
                    className="image"
                    style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                    }}
                    key={index}
                />
            ))}
            {hashtags.map((hashtag, index) => (
                <Hashtag key={index}>{hashtag}</Hashtag>
            ))}
            <div className="interaction">
                <Like
                    onClick={handleLike}
                    className={`like-icon ${isLiked ? 'active' : ''}`}
                />
                <Comment onClick={handleShowComment} />
            </div>
            {newComments.length > 0 &&
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
            {showComment && (
                <div className="comment-box">
                    <Profile
                        image={userImage}
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
                            />
                        }
                    />
                </div>
            )}
        </StyledPostDetail>
    );
};

export default PostDetail;
