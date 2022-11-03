import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseNoAuthQuery } from './baseQuery';

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: baseNoAuthQuery,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body: ILogin) => ({
                url: '/users/login',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLoginMutation } = authAPI;
