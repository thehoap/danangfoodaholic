import { Empty } from 'antd';
import Button from 'components/Button';
import { PAGINATION, TAB } from 'constants/data';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyGetPostsQuery } from 'services/postAPI';
import PostDetail, { SkeletonPostDetail } from './PostDetail';
import { StyledPosts } from './styles';

interface IPosts {
    restaurantId?: string;
}

const Posts = ({ restaurantId }: IPosts) => {
    const navigate = useNavigate();
    const [getPosts, { data, isLoading, isFetching }] = useLazyGetPostsQuery();

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
            {isLoading ? (
                Array(10)
                    .fill(0)
                    .map((_, index) => <SkeletonPostDetail key={index} />)
            ) : posts && posts?.length > 0 ? (
                posts?.map((post) => <PostDetail post={post} key={post.id} />)
            ) : (
                <Empty description="There are no reviews here. Do you want to create your own ones? ">
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate({
                                search: `?tab=${TAB.CREATE}`,
                            });
                        }}
                    >
                        Create my review
                    </Button>
                </Empty>
            )}
        </StyledPosts>
    );
};

export default Posts;
