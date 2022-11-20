import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';

import { Comment, Like } from 'assets/icons';
import Hashtag from 'components/Hashtag';
import Profile from 'components/Profile';
import TextArea from 'components/TextArea';
import { useAppSelector } from 'redux/hooks';
import { useUpdatePostMutation } from 'services/postAPI';
import { timestampToDate } from 'utils/dateFormat';
import { StyledPostDetail } from './styles';
import * as ERRORS from 'constants/errors';
import * as REGEX from 'constants/regex';

interface IPostDetail {
    post: IPost;
}

const dateFormat = 'DD/MM/YYYY hh:mm';

const PostDetail = ({ post }: IPostDetail) => {
    const { userId, image: userImage } = useAppSelector(
        (state) => state.profile
    );

    const [updatePost] = useUpdatePostMutation();

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
        initialValues: { comment: '' },
        validationSchema: yup.object().shape({
            comment: yup
                .string()
                .required(ERRORS.COMMENT.required)
                .matches(REGEX.NO_SPACES_ONLY, ERRORS.COMMENT.required),
        }),
        onSubmit: (values) => {
            console.log({ values });
        },
    });

    const [isLiked, setIsLiked] = useState<boolean>(() => {
        const isLiked = likes?.includes(userId);
        return isLiked;
    });
    const [showComment, setShowComment] = useState<boolean>(false);

    const handleLike = () => {
        setIsLiked((liked) => !liked);
        updatePost({ body: { userId, action: 'likes' }, id });
    };

    const handleComment = (e: KeyboardEventType<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            formik.submitForm();
        }
    };

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
                <Comment onClick={() => setShowComment(true)} />
            </div>
            {showComment && (
                <div className="comment-box">
                    <Profile
                        image={userImage}
                        title={
                            <TextArea
                                label=""
                                id="comment"
                                name="comment"
                                formik={formik}
                                value={formik.values.comment}
                                onChange={formik.handleChange}
                                onKeyDown={handleComment}
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
