import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseAuthQuery } from './baseQuery';

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: baseAuthQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsers: builder.query<IResponseFormat<IPagination<IUser>>, unknown>({
            query: () => ({
                url: '/users',
            }),
            providesTags: ['User'],
        }),
        updateUser: builder.mutation<IUser, unknown>({
            query: (body: IUser) => ({
                url: `/users/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation<string, unknown>({
            query: (id: string) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useLazyGetUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userAPI;
