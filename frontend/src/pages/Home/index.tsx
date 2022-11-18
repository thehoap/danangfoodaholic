import ImagesUpload from 'components/ImagesUpload';
import Map from 'components/Map';
import { PAGINATION } from 'constants/data';
import MainLayout from 'layouts/MainLayout';
import { useEffect, useState } from 'react';
import { useLazyGetRestaurantsQuery } from 'services/restaurantAPI';

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

    return <MainLayout>{/* <Map restaurants={restaurants} /> */}</MainLayout>;
};

export default Home;
