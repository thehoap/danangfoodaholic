import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseAuthQuery } from './baseQuery';

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: baseAuthQuery,
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getPosts: builder.query<
            IResponseFormat<IPagination<IPost>>,
            IPostParams
        >({
            query: (params) => ({
                url: '/posts',
                params,
            }),
            providesTags: ['Post'],
        }),
        createPost: builder.mutation({
            query: (body: IPost) => ({
                url: 'posts/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Post'],
        }),
    }),
});

export const { useLazyGetPostsQuery, useCreatePostMutation } = postAPI;
