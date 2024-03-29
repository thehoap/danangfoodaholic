import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { method } from 'lodash';
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
        getPostDetail: builder.query<IResponseFormat<IPost>, string>({
            query: (id) => ({
                url: `/posts/${id}`,
            }),
            providesTags: ['Post'],
        }),
        createPost: builder.mutation({
            query: (body: IPostRequest) => ({
                url: '/posts',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Post'],
        }),
        updatePost: builder.mutation({
            query: ({
                body,
                id,
            }: {
                body: { userId: string; action: string };
                id: string;
            }) => ({
                url: `/posts/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Post'],
        }),
        createComment: builder.mutation<IResponseFormat<IComment>, IComment>({
            query: (body: IComment) => ({
                url: '/comments',
                method: 'POST',
                body,
            }),
        }),
        deletePost: builder.mutation({
            query: (id: string) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post'],
        }),
    }),
});

export const {
    useLazyGetPostsQuery,
    useLazyGetPostDetailQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useCreateCommentMutation,
    useDeletePostMutation,
} = postAPI;
