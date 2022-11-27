import { Divider } from 'antd';
import { PostCategory, StyledPostCategories } from './styles';

interface IPostCategories {
    hashtags: string[];
}

const PostCategories = ({ hashtags }: IPostCategories) => {
    return (
        <StyledPostCategories>
            <h3>Post Categories</h3>
            <Divider />
            {hashtags.map((hashtag) => (
                <PostCategory>{hashtag}</PostCategory>
            ))}
        </StyledPostCategories>
    );
};

export default PostCategories;
