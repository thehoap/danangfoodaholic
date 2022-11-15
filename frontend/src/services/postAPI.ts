import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseAuthQuery } from './baseQuery';

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: baseAuthQuery,
    endpoints: (builder) => ({
        createPost: builder.mutation({
            query: (body: IPost) => ({
                url: 'posts/',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useCreatePostMutation } = postAPI;
