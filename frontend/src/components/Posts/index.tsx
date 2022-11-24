import { PAGINATION } from 'constants/data';
import { useEffect, useState } from 'react';
import { useLazyGetPostsQuery } from 'services/postAPI';
import PostDetail from './PostDetail';
import { StyledPosts } from './styles';

interface IPosts {
    restaurantId?: string;
}

const Posts = ({ restaurantId }: IPosts) => {
    const [getPosts, { data, isFetching }] = useLazyGetPostsQuery();

    const [posts, setPosts] = useState<IPost[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        getPosts({
            page: currentPage,
            limit: PAGINATION.PAGE_SIZE,
            restaurantId,
        });
    }, []);

    useEffect(() => {
        setPosts(data?.data.docs);
    }, [isFetching]);

    return (
        <StyledPosts>
            {posts?.map((post) => (
                <PostDetail post={post} key={post.id} />
            ))}
        </StyledPosts>
    );
};

export default Posts;
