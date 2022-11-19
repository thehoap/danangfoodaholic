import { Tag } from 'antd';
import { Comment, Like } from 'assets/icons';
import Profile from 'components/Profile';
import { useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { useUpdatePostMutation } from 'services/postAPI';
import { timestampToDate } from 'utils/dateFormat';
import { StyledPostDetail } from './styles';

interface IPostDetail {
    post: IPost;
}

const dateFormat = 'DD/MM/YYYY hh:mm';

const PostDetail = ({ post }: IPostDetail) => {
    const { userId } = useAppSelector((state) => state.profile);

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

    const [isLiked, setIsLiked] = useState<boolean>(() => {
        const isLiked = likes?.includes(userId);
        return isLiked;
    });

    const handleLike = () => {
        setIsLiked((liked) => !liked);
        updatePost({ body: { userId, action: 'likes' }, id });
    };

    const handleComment = () => {};

    return (
        <StyledPostDetail>
            <Profile image={image} title={name} description={postTime} />
            <h1 className="title">{title}</h1>
            <h2 className="compliment">Điều tôi thích ở địa điểm này</h2>
            <span dangerouslySetInnerHTML={{ __html: compliment }}></span>
            <h2 className="compliment">Những điều cần cải thiện</h2>
            <span dangerouslySetInnerHTML={{ __html: need_improve }}></span>
            {images.map((image) => (
                <img
                    src={image}
                    alt=""
                    className="image"
                    style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                    }}
                />
            ))}
            {hashtags.map((hashtag) => (
                <Tag>{hashtag}</Tag>
            ))}
            <div className="interaction">
                <Like
                    onClick={handleLike}
                    className={`like-icon ${isLiked ? 'active' : ''}`}
                />
                <Comment onClick={handleComment} />
            </div>
        </StyledPostDetail>
    );
};

export default PostDetail;
