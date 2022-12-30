import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import pokemonService from '../services/pokemonService'

const initialState = {
    pokemon: null,
    pokemons: [],
    pokemonSpecie: null,
    message: null,
    error: false,
    success: false,
    loading: false,
}


//Get All user from ApiPokemon
export const getAllPokemons = createAsyncThunk("pokemon/Alldata",
    async (limit, offset) => {

        const data = await pokemonService.getAllPokemons(limit, offset);

        return data;

    });

export const nextPagePokemons = createAsyncThunk("pokemon/nextPage",
    async (offset) => {

        const data = await pokemonService.nextPagePokemons(offset);

        return data;

    });

// find pokemon by name or ID
export const searchPokemon = createAsyncThunk("pokemon/search",
    async (name, thunkAPI) => {

        const data = await pokemonService.searchPokemon(name);

        if (data.status === 404 || data.status === 500) {
            return thunkAPI.rejectWithValue(data);
        }

        console.log(data)

        return data;

    });


//Get pokemon by id from ApiPokemon
export const getPokemonByidApi = createAsyncThunk("pokemon/byId",
    async (idPokemon, thunkAPI) => {

        const data = await pokemonService.getPokemonByidApi(idPokemon);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;

    });

    //Get expecies pokemon and filter flavor text pokemon
    export const getPokemonSpecies = createAsyncThunk("pokemon/species",
    async (id, thunkAPI) => {

        const data = await pokemonService.getPokemonSpecies(id);

        if (data.status === 404 || data.status === 500) {
            return thunkAPI.rejectWithValue(data);
        }
       
        let flavor_text = ''

       await data.flavor_text_entries.map((item)=>{
            if(item.language.name === 'en'){
                flavor_text = item.flavor_text;
            }
            return true;
        })

        return flavor_text;

    });

    //save favorites pokemns in the firebase
    export const favoritePokemon = createAsyncThunk("pokemon/favorite",
    async (document, thunkAPI) => {

        const data = await pokemonService.favoritePokemon(document)

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;

    });

    //find pokemons bu uid at the firebase
    export const findPokemonsByUid = createAsyncThunk("pokemon/byuid",
    async (objSearch, thunkAPI) => {

        const data = await pokemonService.findAllPokemonsByUid(objSearch);

        if (data.status === 404 || data.status === 500) {
            return thunkAPI.rejectWithValue(data);
        }

        return data;

    });

//functions
export const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        reset: (state) => {
            state.message = '';
            state.pokemon = null;
            state.pokemonSpecie = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getPokemonByidApi.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(getPokemonByidApi.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                state.pokemon = action.payload;
                state.message = "Sucesso!";
            }).addCase(getPokemonByidApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.pokemon = {}
                state.message = "erro ao buscar pokemon";
            })

            .addCase(getAllPokemons.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(getAllPokemons.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                state.pokemons = action.payload;
                state.message = "Sucesso!";
            }).addCase(getAllPokemons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.pokemons = {}
                state.message = "erro ao buscar pokemon";
            })

            .addCase(nextPagePokemons.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(nextPagePokemons.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                state.pokemons = state.pokemons.concat(action.payload);
                state.message = "Sucesso!";
            }).addCase(nextPagePokemons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.pokemons = {}
                state.message = "Error ";
            })

            .addCase(searchPokemon.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(searchPokemon.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                state.pokemon = action.payload
                state.message = "Sucesso!";
            }).addCase(searchPokemon.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.pokemon = null;
                state.message = action.payload.message;
            })

            .addCase(getPokemonSpecies.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(getPokemonSpecies.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                state.pokemonSpecie = action.payload
                state.message = "Sucesso!";
            }).addCase(getPokemonSpecies.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.pokemonSpecie = null;
                state.message = action.payload.message;
            })

            .addCase(favoritePokemon.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(favoritePokemon.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                state.pokemonSpecie = action.payload
                state.message = "Sucesso!";
            }).addCase(favoritePokemon.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.pokemonSpecie = null;
                state.message = action.payload.message;
            })

            
            .addCase(findPokemonsByUid.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(findPokemonsByUid.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                state.pokemons = action.payload
                state.message = "Sucesso!";
            }).addCase(findPokemonsByUid.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.pokemons = [];
                state.message = action.payload.message;
            })
    }
})

export const { reset } = pokemonSlice.actions;
export default pokemonSlice.reducer;