import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseFacebookQuery } from './baseQuery';

const attachAccessToken = (params: any) => ({
    ...params,
    access_token: process.env.REACT_APP_FACEBOOK_ACCESS_TOKEN,
});

export const facebookAPI = createApi({
    reducerPath: 'facebookAPI',
    baseQuery: baseFacebookQuery,
    endpoints: (builder) => ({
        testMessage: builder.mutation({
            query: (params) => ({
                url: '/feed',
                method: 'POST',
                params,
            }),
        }),
        testPhoto: builder.mutation({
            query: (params) => ({
                url: '/photos',
                method: 'POST',
                params,
            }),
        }),
        unpublishPhoto: builder.mutation<
            IUnpublishPhotoResponse,
            IUnpublishPhotoParams
        >({
            query: (params: IUnpublishPhotoParams) => ({
                url: '/photos',
                method: 'POST',
                params: attachAccessToken(params),
            }),
        }),
        publishPhotos: builder.mutation<IPublishPhotoResponse, any>({
            query: (params: any) => ({
                url: '/feed',
                method: 'POST',
                params: attachAccessToken(params),
            }),
        }),
    }),
});

export const {
    useTestMessageMutation,
    useTestPhotoMutation,
    useUnpublishPhotoMutation,
    usePublishPhotosMutation,
} = facebookAPI;
