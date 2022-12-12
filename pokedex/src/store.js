import { configureStore } from "@reduxjs/toolkit";

//Reduces
import pokemonReducer from './slices/pokemonSlice';

export const store = configureStore({
    reducer:{
        pokemon:pokemonReducer
    }
})