import { Col, Row } from 'antd';
import Slider from 'components/Slider';
import { PAGINATION } from 'constants/data';
import MainLayout from 'layouts/MainLayout';
import { useEffect, useState } from 'react';
import { useLazyGetRestaurantsQuery } from 'services/restaurantAPI';
import RestaurantSlider from './RestaurantSlider';

const Home = () => {
    const [getRestaurants, { data, isLoading, isFetching }] =
        useLazyGetRestaurantsQuery();

    const [restaurants, setRestaurants] = useState<IRestaurant[]>();
    useEffect(() => {
        getRestaurants({
            page: 1,
            limit: PAGINATION.ALL,
        });
    }, []);

    useEffect(() => {
        setRestaurants(data?.data.docs);
    }, [isFetching]);

    return (
        <MainLayout>
            <Slider
                data={
                    restaurants &&
                    restaurants
                        ?.slice(0, 10)
                        .map((restaurant, index) => (
                            <RestaurantSlider
                                restaurant={restaurant}
                                key={index}
                            />
                        ))
                }
                slidesToShow={4.5}
            />
            {/* <Map restaurants={restaurants} /> */}
        </MainLayout>
    );
};

export default Home;
