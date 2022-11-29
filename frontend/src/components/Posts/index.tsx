import { Empty } from 'antd';
import Button from 'components/Button';
import { PAGINATION, TAB } from 'constants/data';
import { PATH } from 'constants/path';
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
    const [hashtag, setHashtag] = useState<string>('');

    useEffect(() => {
        getPosts({
            page: currentPage,
            limit: PAGINATION.PAGE_SIZE,
            restaurantId,
            hashtag,
        });
    }, [hashtag]);

    useEffect(() => {
        setPosts(data?.data.docs);
    }, [isFetching]);

    return (
        <StyledPosts>
            {isFetching ? (
                Array(10)
                    .fill(0)
                    .map((_, index) => <SkeletonPostDetail key={index} />)
            ) : posts && posts?.length > 0 ? (
                posts?.map((post) => (
                    <PostDetail
                        post={post}
                        key={post.id}
                        setHashtag={setHashtag}
                    />
                ))
            ) : (
                <Empty
                    description={`There are no reviews here. ${
                        restaurantId
                            ? 'Do you want to create your own ones?'
                            : 'Choose the restaurant that you have experienced then create one.'
                    } `}
                >
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate(
                                restaurantId
                                    ? {
                                          search: `?tab=${TAB.CREATE}`,
                                      }
                                    : PATH.RESTAURANTS.path
                            );
                        }}
                    >
                        {restaurantId
                            ? 'Create my review'
                            : 'Go to Restaurants'}
                    </Button>
                </Empty>
            )}
        </StyledPosts>
    );
};

export default Posts;
