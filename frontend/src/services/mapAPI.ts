import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseMapboxQuery } from './baseQuery';

export const mapAPI = createApi({
    reducerPath: 'mapAPI',
    baseQuery: baseMapboxQuery,
    endpoints: (builder) => ({
        getDistance: builder.query({
            query: (params: { from: ICoordinates; to: ICoordinates }) => {
                const {
                    from: { long: longFrom, lat: latFrom },
                    to: { long: longTo, lat: latTo },
                } = params;

                return {
                    url: `/directions/v5/mapbox/driving/${longFrom},${latFrom};${longTo},${latTo}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`,
                };
            },
        }),
    }),
});

export const { useLazyGetDistanceQuery } = mapAPI;
