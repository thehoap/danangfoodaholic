import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseNoAuthQuery } from './baseQuery';

export const commonAPI = createApi({
    reducerPath: 'commonAPI',
    baseQuery: baseNoAuthQuery,
    endpoints: (builder) => ({
        uploadImages: builder.mutation<IResponseFormat<string[]>, FormData>({
            query: (body: FormData) => ({
                url: 'commons/upload-images',
                method: 'POST',
                body,
            }),
        }),
        getTrending: builder.query({
            query: () => ({
                url: 'commons/treding',
            }),
        }),
    }),
});

export const { useUploadImagesMutation, useLazyGetTrendingQuery } = commonAPI;
