import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    image: '',
    name: '',
    email: '',
    userId: '',
};

const profile = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateProfile(state, action) {
            state.image = action.payload.image;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.userId = action.payload.userId;
        },
    },
});

const { actions, reducer } = profile;

export const { updateProfile } = actions;

export default reducer;
