import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseAuthQuery } from './baseQuery';

export const restaurantAPI = createApi({
    reducerPath: 'restaurantAPI',
    baseQuery: baseAuthQuery,
    endpoints: (builder) => ({
        getRestaurants: builder.query<
            IResponseFormat<IPagination<IRestaurant>>,
            ICommonParams
        >({
            query: (params) => ({
                url: '/restaurants',
                params,
            }),
        }),
        getRestaurant: builder.query<
            IResponseFormat<IRestaurantDetail>,
            string
        >({
            query: (id: string) => ({
                url: `/restaurants/${id}`,
            }),
        }),
    }),
});

export const { useLazyGetRestaurantsQuery, useLazyGetRestaurantQuery } =
    restaurantAPI;
