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
        register: builder.mutation({
            query: (body: IRegister) => ({
                url: '/users/register',
                method: 'POST',
                body,
            }),
        }),
        uploadImages: builder.mutation<IResponseFormat<string[]>, FormData>({
            query: (body: FormData) => ({
                url: 'commons/upload-images',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useUploadImagesMutation,
    useLoginMutation,
    useRegisterMutation,
} = authAPI;
