import { Divider } from 'antd';
import PostCategory from './PostCategory';
import { StyledPostCategories } from './styles';

interface IPostCategories {
    hashtags: string[];
}

const PostCategories = ({ hashtags }: IPostCategories) => {
    return (
        <StyledPostCategories>
            <h3>Post Categories</h3>
            <Divider />
            {hashtags.map((hashtag) => (
                <PostCategory key={hashtag} hashtag={hashtag} />
            ))}
        </StyledPostCategories>
    );
};

export default PostCategories;
