import { Divider } from 'antd';
import Pagination from 'components/Pagination';
import { PAGINATION } from 'constants/data';
import MainLayout from 'layouts/MainLayout';
import { useEffect, useState } from 'react';
import { useLazyGetRestaurantsQuery } from 'services/restaurantAPI';
import RestaurantCard, {
    SkeletonRestaurantCard,
} from './components/RestaurantCard';
import RestaurantsFilter from './components/RestaurantsFilter';
import { StyledRestaurants } from './styles';

const Restaurants = () => {
    const [getRestaurants, { data, isLoading, isFetching }] =
        useLazyGetRestaurantsQuery();

    const [restaurants, setRestaurants] = useState<IRestaurant[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filter, setFilter] = useState<IRestaurantFilter>({
        districtId: undefined,
        type: undefined,
        searchTerm: undefined,
    });

    useEffect(() => {
        getRestaurants({
            page: currentPage,
            limit: PAGINATION.PAGE_SIZE,
            ...filter,
        });
    }, [currentPage, filter]);

    useEffect(() => {
        setRestaurants(data?.data.docs);
    }, [isFetching]);

    return (
        <MainLayout>
            <RestaurantsFilter
                filter={filter}
                setFilter={setFilter}
                isLoading={isLoading}
            />
            <Divider />
            <StyledRestaurants>
                {isLoading
                    ? Array(PAGINATION.PAGE_SIZE)
                          .fill(0)
                          .map((item, index) => (
                              <SkeletonRestaurantCard key={index} />
                          ))
                    : restaurants?.map((restaurant) => (
                          <RestaurantCard
                              key={restaurant._id}
                              restaurant={restaurant}
                          />
                      ))}
            </StyledRestaurants>
            <Pagination
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
                total={data?.data?.totalDocs || 0}
                pageSize={PAGINATION.PAGE_SIZE}
                showLessItems
            />
        </MainLayout>
    );
};

export default Restaurants;
