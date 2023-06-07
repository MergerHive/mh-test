import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/login/authSlice'
import configReducer from './configSlice'
import profileReducer from '../pages/CreateProfilePage/ProfileSlice'
// const persistedAuthReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        config: configReducer,
        profile: profileReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})

