import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import pokemonService from '../services/pokemonService'

const initialState = {
    pokemon:{},
    pokemons:[],
    message:null,
    error:false,
    success:false,
    loading:false,
}


//Get All user from ApiPokemon
export const getAllPokemons = createAsyncThunk("pokemon/Alldata",
async(limit,offset) =>{

    const data = await pokemonService.getAllPokemons(limit,offset);

    return data;

});

//Get pokemon by id from ApiPokemon
export const getPokemonByidApi = createAsyncThunk("pokemon/byId",
async (idPokemon,thunkAPI)=>{

    const data = await pokemonService.getPokemonByidApi(idPokemon);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.error);
    }

    return data;

});

//functions
export const pokemonSlice = createSlice({
    name:"pokemon",
    initialState,
    reducers:{
        reset: (state) => {
           state.message = '';
        },
    },

    extraReducers:(builder) => {
        builder
        .addCase(getPokemonByidApi.pending,(state)=>{
            state.loading = true;
            state.error = false;
        }).addCase( getPokemonByidApi.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = false;
            state.success = true;
            state.pokemon = action.payload;
            state.message = "Sucesso!";
        }).addCase( getPokemonByidApi.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.success = false;
            state.pokemon = {}
            state.message = "erro ao buscar pokemon";
        } )
        
        .addCase(getAllPokemons.pending,(state)=>{
            state.loading = true;
            state.error = false;
        }).addCase( getAllPokemons.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = false;
            state.success = true;
            state.pokemons = action.payload;
            state.message = "Sucesso!";
        }).addCase( getAllPokemons.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.success = false;
            state.pokemons = {}
            state.message = "erro ao buscar pokemon";
        })
    }
})

export const {reset} = pokemonSlice.actions;
export default pokemonSlice.reducer;