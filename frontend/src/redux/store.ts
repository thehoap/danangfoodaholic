import {
    configureStore,
    ThunkAction,
    Action,
    combineReducers,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

import { authAPI, profileAPI } from 'services';

const reducer = combineReducers({
    [authAPI.reducerPath]: authAPI.reducer,
    [profileAPI.reducerPath]: profileAPI.reducer,
});

const middleware = (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
    getDefaultMiddleware()
        .concat(authAPI.middleware)
        .concat(profileAPI.middleware);

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
