import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseNoAuthQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    cache: 'no-cache',
});

export const baseAuthQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    cache: 'no-cache',
});

export const baseMapboxQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_MAPBOX_URL,
    cache: 'no-cache',
});

export const baseFacebookQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_FACEBOOK_URL,
    cache: 'no-cache',
});
