import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseAuthQuery } from './baseQuery';

export const profileAPI = createApi({
    reducerPath: 'profileAPI',
    baseQuery: baseAuthQuery,
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: 'users/profile',
            }),
        }),
    }),
});

export const { useLazyGetProfileQuery } = profileAPI;
