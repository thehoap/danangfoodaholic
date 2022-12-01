import { StyledPostCategory } from './styles';
import { PATH } from 'constants/path';
import { useNavigate } from 'react-router-dom';

interface IPostCategory {
    hashtag: string;
    active?: boolean;
}

const PostCategory = ({ hashtag, active }: IPostCategory) => {
    const navigate = useNavigate();
    const handleNavigatePost = (hashtag: string) => () => {
        navigate({ pathname: PATH.POSTS.path, search: `?hashtag=${hashtag}` });
    };

    return (
        <StyledPostCategory
            onClick={handleNavigatePost(hashtag)}
            children={hashtag}
            className={active ? 'active' : undefined}
        />
    );
};

export default PostCategory;
