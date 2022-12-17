import { Empty } from 'antd';
import Button from 'components/Button';
import { PAGINATION, TAB } from 'constants/data';
import { PATH } from 'constants/path';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLazyGetPostsQuery } from 'services/postAPI';
import PostDetail, { SkeletonPostDetail } from './PostDetail';
import { StyledPosts } from './styles';

interface IPosts {
    restaurantId?: string;
    setAmoutPosts?: SetStateType<number>;
    posts: IPost[];
    setPosts: SetStateType<IPost[]>;
}

const Posts = ({ restaurantId, setAmoutPosts, posts, setPosts }: IPosts) => {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const [getPosts, { data, isLoading, isFetching }] = useLazyGetPostsQuery();

    const _hashtag = searchParams.get('hashtag');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hashtag, setHashtag] = useState<string>(_hashtag || '');
    const [fisrtLoading, setFirstLoading] = useState(true);

    useEffect(() => {
        if (_hashtag) {
            setHashtag(_hashtag);
            setCurrentPage(1);
            setPosts([]);
            setFirstLoading(true);
        }
    }, [_hashtag]);

    useEffect(() => {
        getPosts({
            page: currentPage,
            limit: PAGINATION.PAGE_SIZE,
            restaurantId,
            hashtag,
        });
    }, [hashtag, currentPage]);

    useEffect(() => {
        setPosts((prev) => prev.concat(data?.data?.docs || []));
        setAmoutPosts && setAmoutPosts(data?.data?.totalDocs || 0);
        data && setFirstLoading(false);
    }, [data]);

    return (
        <StyledPosts>
            {fisrtLoading ? (
                Array(10)
                    .fill(0)
                    .map((_, index) => <SkeletonPostDetail key={index} />)
            ) : posts && posts?.length > 0 ? (
                <>
                    {posts?.map((post) => (
                        <PostDetail
                            post={post}
                            key={post?.id}
                            setPosts={setPosts}
                        />
                    ))}
                    <Button
                        type="primary"
                        onClick={() => setCurrentPage((page) => page + 1)}
                        loading={isFetching}
                        disabled={data?.data?.totalPages === currentPage}
                    >
                        Load more
                    </Button>
                </>
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
