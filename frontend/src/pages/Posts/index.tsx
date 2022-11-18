import MainLayout from 'layouts/MainLayout';
import PostsList from 'components/Posts';
import { useSearchParams } from 'react-router-dom';

const Posts = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const hashtag = searchParams.get('hashtag');

    return (
        <MainLayout>
            <PostsList />
        </MainLayout>
    );
};

export default Posts;
