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
export const getPokemons = createAsyncThunk("pokemon/All",
async() =>{

    const data = await pokemonService.getPokemons();

    return data;

});

export const getAllPokemons = createAsyncThunk("pokemon/Alldata",
async() =>{

    const data = await pokemonService.getAllPokemons();

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

export const getPokemonData = createAsyncThunk("pokemon/byUri",
async (url)=>{

    const data = await pokemonService.getPokemonData(url);

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
        builder.addCase( getPokemons.pending,(state)=>{
            state.loading = true;
            state.error = false;
        }).addCase( getPokemons.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = false;
            state.success = true;
            state.pokemons = action.payload;
        }).addCase(getPokemons.rejected,(state,action)=>{
            state.loading = false;
            state.error=action.payload;
            state.pokemons=[];
        })


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

        .addCase(getPokemonData.pending,(state)=>{
            state.loading = true;
            state.error = false;
        }).addCase( getPokemonData.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = false;
            state.success = true;
            state.pokemon = action.payload;
            state.message = "Sucesso!";
        }).addCase( getPokemonData.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.success = false;
            state.pokemon = {}
            state.message = "erro ao buscar pokemon";
        })
        
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