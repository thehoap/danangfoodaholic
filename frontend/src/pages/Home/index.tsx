import { Col, Divider, Row } from 'antd';
import Map from 'components/Map';
import PostCategories from 'components/PostCategories';
import Slider from 'components/Slider';
import Spin from 'components/Spin';
import { Spin as AntSpin } from 'antd';
import { PAGINATION } from 'constants/data';
import MainLayout from 'layouts/MainLayout';
import { useEffect, useState } from 'react';
import { useLazyGetRestaurantsQuery } from 'services/restaurantAPI';
import PostSlider from './PostSlider';
import RestaurantSlider, { SkeletonRestaurantSlider } from './RestaurantSlider';
import { StyledHome } from './styles';

const Home = () => {
    const [getRestaurants, { data, isFetching }] = useLazyGetRestaurantsQuery();

    const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
    useEffect(() => {
        getRestaurants({
            page: 1,
            limit: PAGINATION.ALL,
        });
    }, []);

    useEffect(() => {
        setRestaurants(data ? data.data.docs : []);
    }, [isFetching]);
    const hashtags = [
        'LO2jZirB',
        'W6JscPdX',
        'MAOCxXW5',
        '7rMIIm2J',
        'h3z5AlqF',
        'EYpufHL2',
        'wle133yg',
        'TKaCHQfZ',
        '2gqXOhNl',
        'TP37AO9A',
        'KElYB9QE',
        '5fJbhK8C',
        'AA11DY6x',
        'ODxRDgnk',
        'RCq4Y17k',
        'x4lOTCvP',
        'Lc0vsq0X',
        '2vIIp7dp',
        'jWOp2EHU',
        '7JZtOxMc',
        '9MHr9au5',
        '38n0A2Bs',
        'zEAhpKkC',
        'SYv2Fd9b',
        'fjG3rzDz',
        'eEdE8Zvz',
        '69bbAf85',
        '46b1L8bX',
        'YhayjvcS',
    ];
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
                        />
                    </Spin>
                </section>
                <section>
                    <h3>Trending Posts</h3>
                    <Divider />
                    <Row>
                        <Col span={16}>
                            <PostSlider />
                        </Col>
                        <Col span={8}>
                            <PostCategories hashtags={hashtags} />
                        </Col>
                    </Row>
                </section>
                <section>
                    <h3>Map</h3>
                    <Divider />
                    <Map restaurants={restaurants} />
                </section>
            </StyledHome>
        </MainLayout>
    );
};

export default Home;
