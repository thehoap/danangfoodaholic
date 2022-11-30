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

const restaurantSlidesToShow = 4.5;
const restaurantResponsive: number[] = [
    1452, 1324, 1180, 1032, 988, 840, 692, 544,
];

const postSlidesToShow = 2.5;
const postResponsive: number[] = [1264, 1080, 860];

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
                            responsive={restaurantResponsive.map(
                                (breakpoint, index) => ({
                                    breakpoint,
                                    settings: {
                                        slidesToShow:
                                            restaurantSlidesToShow -
                                            0.5 * (index + 1),
                                    },
                                })
                            )}
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
                                    slidesToShow={postSlidesToShow}
                                    viewMorePath={PATH.POSTS.path}
                                    responsive={postResponsive.map(
                                        (breakpoint, index) => ({
                                            breakpoint,
                                            settings: {
                                                slidesToShow:
                                                    postSlidesToShow -
                                                    0.5 * (index + 1),
                                            },
                                        })
                                    )}
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
