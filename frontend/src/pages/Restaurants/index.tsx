import Pagination from 'components/Pagination';
import { PAGINATION } from 'constants/data';
import MainLayout from 'layouts/MainLayout';
import { useEffect, useState } from 'react';
import { useLazyGetRestaurantsQuery } from 'services/restaurantAPI';
import Restaurant from './components/Restaurant';
import { StyledRestaurants } from './styles';

const Restaurants = () => {
    const [getRestaurants, { data, isFetching }] = useLazyGetRestaurantsQuery();

    const [restaurants, setRestaurants] = useState<IRestaurant[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        getRestaurants({
            page: currentPage,
            limit: PAGINATION.PAGE_SIZE,
        });
    }, [currentPage]);

    useEffect(() => {
        setRestaurants(data?.data.docs);
    }, [isFetching]);

    return (
        <MainLayout>
            <StyledRestaurants>
                {restaurants?.map((restaurant) => (
                    <Restaurant key={restaurant.id} restaurant={restaurant} />
                ))}
            </StyledRestaurants>
            <Pagination
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
                total={data?.data.totalDocs}
                pageSize={PAGINATION.PAGE_SIZE}
                showLessItems
            />
        </MainLayout>
    );
};

export default Restaurants;
