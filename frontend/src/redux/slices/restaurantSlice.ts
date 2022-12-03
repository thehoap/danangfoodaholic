import { createSlice } from '@reduxjs/toolkit';

const initialState: { restaurant: IRestaurantDetail } = {
    restaurant: {
        _id: '',
        link: '',
        image: '',
        name: '',
        type: '',
        address: '',
        districtId: -1,
        wardId: -1,
        menuId: '',
        time: '',
        priceRange: '',
        menu: [],
        coordinates: {
            lat: -1,
            long: -1,
        },
        ratings: {
            space: [],
            food: [],
            hygiene: [],
            service: [],
            price: [],
            average: [],
        },
    },
};

const restaurant = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        getReviewedRestaurant(state, { payload }) {
            state.restaurant = payload;
        },
    },
});

const { actions, reducer } = restaurant;

export const { getReviewedRestaurant } = actions;

export default reducer;
