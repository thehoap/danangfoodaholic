import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseNoAuthQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Content-Type', 'application/json; charset=utf-8');
        return headers;
    },
    cache: 'no-cache',
});
