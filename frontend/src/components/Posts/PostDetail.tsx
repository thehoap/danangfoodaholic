import { Tag } from 'antd';
import Profile from 'components/Profile';
import { timestampToDate } from 'utils/dateFormat';
import { StyledPostDetail } from './styles';

interface IPostDetail {
    post: IPost;
}

const dateFormat = 'DD/MM/YYYY hh:mm';

const PostDetail = ({ post }: IPostDetail) => {
    const {
        title,
        compliment,
        need_improve,
        user: { image, name },
        images,
        hashtags,
        createdAt,
    } = post;

    const postTime = timestampToDate(dateFormat, createdAt);

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
        </StyledPostDetail>
    );
};

export default PostDetail;
