import {
    configureStore,
    ThunkAction,
    Action,
    combineReducers,
} from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

import profile from 'redux/slices/profileSlice';
import message from 'redux/slices/messageSlice';
import restaurant from 'redux/slices/restaurantSlice';
import {
    authAPI,
    commonAPI,
    profileAPI,
    restaurantAPI,
    userAPI,
    postAPI,
    mapAPI,
    facebookAPI,
} from 'services';

const reducer = combineReducers({
    profile,
    restaurant,
    message,

    [authAPI.reducerPath]: authAPI.reducer,
    [profileAPI.reducerPath]: profileAPI.reducer,
    [restaurantAPI.reducerPath]: restaurantAPI.reducer,
    [commonAPI.reducerPath]: commonAPI.reducer,
    [postAPI.reducerPath]: postAPI.reducer,
    [mapAPI.reducerPath]: mapAPI.reducer,
    [facebookAPI.reducerPath]: facebookAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
});

const middleware = (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
    getDefaultMiddleware()
        .concat(authAPI.middleware)
        .concat(profileAPI.middleware)
        .concat(restaurantAPI.middleware)
        .concat(postAPI.middleware)
        .concat(mapAPI.middleware)
        .concat(facebookAPI.middleware)
        .concat(userAPI.middleware)
        .concat(commonAPI.middleware);

export const store = configureStore({
    reducer,
    middleware,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
