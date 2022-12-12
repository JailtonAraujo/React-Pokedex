import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import pokemonService from '../services/pokemonService'

const initialState = {
    error:false,
    success:false,
    loading:false,
    message:''
}


//Get All user from ApiPokemon
export const getPokemonsFromApi = createAsyncThunk('pokemon/getApi',
async(thunkAPI) =>{

    const data = await pokemonService.getPokemonsApi();

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
});

//Get pokemon by id from ApiPokemon
export const getPokemonByidApi = createAsyncThunk('pokemon/byId',
async(idPokemon,thunkAPI)=>{

    const data = await pokemonService.getPokemonByidApi(idPokemon);

    if(data.errors){
        return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;

});

//functions
export const pokemonSlice = createSlice({
    name:'pokemon',
    initialState,
    reducers:{
        resetMessage: (state) => {
            state.message = '';
        },
    },

    extraReducers:(builder) => {
        builder.addCase( getPokemonsFromApi.pending,(state)=>{
            state.loading = true;
            state.error = false;
        }).addCase( getPokemonsFromApi.fulfilled,(state)=>{
            state.loading = false;
            state.error = '';
            state.success = true;
        }).addCase(getPokemonsFromApi.rejected,(state,action)=>{
            state.loading = false;
            state.error=action.payload;
        })

        .addCase(getPokemonByidApi.pending,(state)=>{
            state.loading = true;
            state.error = false;
        }).addCase( getPokemonByidApi.fulfilled,(state)=>{
            state.loading = false;
            state.error = '';
            state.success = true;
        }).addCase( getPokemonByidApi.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        } )
    }
})

export const {resetMessage} = pokemonSlice.actions;
export default pokemonSlice.reducer;