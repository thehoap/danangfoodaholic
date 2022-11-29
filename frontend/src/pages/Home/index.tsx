import { Col, Divider, Row } from 'antd';
import Map from 'components/Map';
import PostCategories from 'components/PostCategories';
import Slider from 'components/Slider';
import Spin from 'components/Spin';
import MainLayout from 'layouts/MainLayout';
import { useEffect, useState } from 'react';
import PostSlider from './PostSlider';
import RestaurantSlider from './RestaurantSlider';
import { StyledHome } from './styles';
import { useLazyGetTrendingQuery } from 'services/commonAPI';
import { PATH } from 'constants/path';

const Home = () => {
    const [getTrending, { data: dataTrending, isFetching }] =
        useLazyGetTrendingQuery();

    const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [hashtags, setHashtags] = useState<string[]>([]);

    useEffect(() => {
        getTrending({});
    }, []);

    useEffect(() => {
        setRestaurants(dataTrending ? dataTrending.data.restaurants : []);
        setPosts(dataTrending ? dataTrending.data.posts : []);
        setHashtags(dataTrending ? dataTrending.data.hashtags : []);
    }, [isFetching]);

    return (
        <MainLayout>
            <StyledHome>
                <section>
                    <h3>Trending Restaurants</h3>
                    <Divider />
                    <Spin spinning={isFetching}>
                        <Slider
                            data={restaurants
                                .slice(0, 10)
                                .map((restaurant, index) => (
                                    <RestaurantSlider
                                        restaurant={restaurant}
                                        key={index}
                                    />
                                ))}
                            slidesToShow={4.5}
                            viewMorePath={PATH.RESTAURANTS.path}
                            responsive={[
                                {
                                    breakpoint: 1452,
                                    settings: {
                                        slidesToShow: 4,
                                    },
                                },
                                {
                                    breakpoint: 1324,
                                    settings: {
                                        slidesToShow: 3.5,
                                    },
                                },
                                {
                                    breakpoint: 1180,
                                    settings: {
                                        slidesToShow: 3,
                                    },
                                },
                                {
                                    breakpoint: 1032,
                                    settings: {
                                        slidesToShow: 2.5,
                                    },
                                },
                                {
                                    breakpoint: 988,
                                    settings: {
                                        slidesToShow: 2,
                                    },
                                },
                                {
                                    breakpoint: 840,
                                    settings: {
                                        slidesToShow: 1.5,
                                    },
                                },
                                {
                                    breakpoint: 692,
                                    settings: {
                                        slidesToShow: 1,
                                    },
                                },
                                {
                                    breakpoint: 544,
                                    settings: {
                                        slidesToShow: 0.5,
                                    },
                                },
                            ]}
                        />
                    </Spin>
                </section>
                <section>
                    <h3>Trending Posts</h3>
                    <Divider />
                    <Row gutter={40}>
                        <Col span={16}>
                            <Spin spinning={isFetching}>
                                <Slider
                                    data={posts
                                        .slice(0, 10)
                                        .map((post, index) => (
                                            <PostSlider
                                                post={post}
                                                key={index}
                                            />
                                        ))}
                                    slidesToShow={2.5}
                                    viewMorePath={PATH.POSTS.path}
                                />
                            </Spin>
                        </Col>
                        <Col span={8}>
                            <PostCategories hashtags={hashtags} />
                        </Col>
                    </Row>
                </section>
                <section>
                    <h3>Map</h3>
                    <Divider />
                    {/* <Map restaurants={restaurants} /> */}
                </section>
            </StyledHome>
        </MainLayout>
    );
};

export default Home;
