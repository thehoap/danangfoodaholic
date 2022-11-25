import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseAuthQuery } from './baseQuery';

export const commonAPI = createApi({
    reducerPath: 'commonAPI',
    baseQuery: baseAuthQuery,
    endpoints: (builder) => ({
        getTrending: builder.query<IResponseFormat<ITrendingResponse>, unknown>(
            {
                query: () => ({
                    url: 'commons/trending',
                }),
            }
        ),
    }),
});

export const { useLazyGetTrendingQuery } = commonAPI;
