import {
    configureStore,
    ThunkAction,
    Action,
    combineReducers,
} from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

import profile from 'redux/slices/profileSlice';
import {
    authAPI,
    commonAPI,
    profileAPI,
    restaurantAPI,
    postAPI,
} from 'services';

const reducer = combineReducers({
    profile,

    [authAPI.reducerPath]: authAPI.reducer,
    [profileAPI.reducerPath]: profileAPI.reducer,
    [restaurantAPI.reducerPath]: restaurantAPI.reducer,
    [commonAPI.reducerPath]: commonAPI.reducer,
    [postAPI.reducerPath]: postAPI.reducer,
});

const middleware = (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
    getDefaultMiddleware()
        .concat(authAPI.middleware)
        .concat(profileAPI.middleware)
        .concat(restaurantAPI.middleware)
        .concat(postAPI.middleware)
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
