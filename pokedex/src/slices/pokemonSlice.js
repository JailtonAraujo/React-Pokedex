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
export const getPokemonsFromApi = createAsyncThunk("pokemon/getApi",
async(thunkAPI) =>{

    const data = await pokemonService.getPokemonsApi();

    if(data.errors){
        return thunkAPI.rejectWithValue(data.error);
    }

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
        builder.addCase( getPokemonsFromApi.pending,(state)=>{
            state.loading = true;
            state.error = false;
        }).addCase( getPokemonsFromApi.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = false;
            state.success = true;
            state.pokemons=action.payload;
        }).addCase(getPokemonsFromApi.rejected,(state,action)=>{
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
    }
})

export const {reset} = pokemonSlice.actions;
export default pokemonSlice.reducer;