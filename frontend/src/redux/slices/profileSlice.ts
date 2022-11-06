import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    image: '',
    name: '',
    email: '',
};

const profile = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateProfile(state, action) {
            state.image = action.payload.image;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
    },
});

const { actions, reducer } = profile;

export const { updateProfile } = actions;

export default reducer;
