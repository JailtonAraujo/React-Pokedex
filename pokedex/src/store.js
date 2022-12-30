import { configureStore } from "@reduxjs/toolkit";

//Reduces
import pokemonReducer from './slices/pokemonSlice';
import authReducer from './slices/authSlice'

export const store = configureStore({
    reducer:{
        pokemon:pokemonReducer,
        auth:authReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    
})