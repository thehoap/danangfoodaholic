import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseAuthQuery } from './baseQuery';

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: baseAuthQuery,
    endpoints: (builder) => ({
        getPosts: builder.query<
            IResponseFormat<IPagination<IPost>>,
            IPostParams
        >({
            query: (params) => ({
                url: '/posts',
                params,
            }),
        }),
        createPost: builder.mutation({
            query: (body: IPost) => ({
                url: 'posts/',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLazyGetPostsQuery, useCreatePostMutation } = postAPI;
