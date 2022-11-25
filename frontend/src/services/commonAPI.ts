import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseAuthQuery } from './baseQuery';

export const commonAPI = createApi({
    reducerPath: 'commonAPI',
    baseQuery: baseAuthQuery,
    endpoints: (builder) => ({
        uploadImages: builder.mutation<IResponseFormat<string[]>, FormData>({
            query: (body: FormData) => ({
                url: 'commons/upload-images',
                method: 'POST',
                body,
            }),
        }),
        getTrending: builder.query<IResponseFormat<ITrendingResponse>, unknown>(
            {
                query: () => ({
                    url: 'commons/trending',
                }),
            }
        ),
    }),
});

export const { useUploadImagesMutation, useLazyGetTrendingQuery } = commonAPI;
