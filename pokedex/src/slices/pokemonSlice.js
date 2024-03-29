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

        const list = data.map((element)=>{
            return {
                name:element.name,
                id:element.id, 
                types:element.types, 
                image:element.sprites.other["official-artwork"].front_default}
        })

        return list;

    });

export const nextPagePokemons = createAsyncThunk("pokemon/nextPage",
    async (offset) => {

        const data = await pokemonService.nextPagePokemons(offset);

        const list = data.map((element)=>{
            return {
                name:element.name,
                id:element.id, 
                types:element.types, 
                image:element.sprites.other["official-artwork"].front_default}
        })

        return list;

    });

// find pokemon by name or ID
export const searchPokemon = createAsyncThunk("pokemon/search",
    async (name, thunkAPI) => {

        const data = await pokemonService.searchPokemon(name);

        if (data.status === 404 || data.status === 500) {
            return thunkAPI.rejectWithValue(data);
        }

        const result = {
            name:data.name,
            id:data.id,
            types:data.types, 
            image:data.sprites.other["official-artwork"].front_default, 
            ability:data.abilities[0].ability.name,
            height:data.height,
            weight:data.weight
            }

        return result;

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

    //save favorites pokemons in the firebase
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

    export const nextPagePokemonsFirebase = createAsyncThunk("pokemon/nextPageFirebase",
    async (docRef, thunkAPI) => {

        const data = await pokemonService.nextPagePokemonsDb(docRef);

        if (data.status === 404 || data.status === 500) {
            return thunkAPI.rejectWithValue(data);
        }

        return data;

    });

    // find pokemon by name from firebase
    export const searchPokemonFromDb = createAsyncThunk("pokemon/search/db",
    async (objSearch, thunkAPI) => {

        const data = await pokemonService.searchPokemonDb(objSearch);

        if (data.status === 404 || data.status === 500) {
            return thunkAPI.rejectWithValue(data);
        }

        return data;

    });

    export const deletePokemon = createAsyncThunk("pokemon/delete",
    async (pokemonToDel, thunkAPI) => {

        const data = await pokemonService.deletePokemonDb(pokemonToDel);

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

            .addCase(nextPagePokemonsFirebase.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(nextPagePokemonsFirebase.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                state.pokemons = state.pokemons.concat(action.payload);
                state.message = "Sucesso!";
            }).addCase(nextPagePokemonsFirebase.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.pokemons = [];
                state.message = action.payload.message;
            })

            .addCase(searchPokemonFromDb.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(searchPokemonFromDb.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                state.pokemon = action.payload
                state.message = "Sucesso!";
            }).addCase(searchPokemonFromDb.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.pokemon = null;
                state.message = action.payload.message;
            })

            .addCase(deletePokemon.pending, (state) => {
                state.loading = true;
                state.error = false;
            }).addCase(deletePokemon.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.success = true;
                state.pokemons = state.pokemons.filter((pok)=>(pok.id !== action.payload));
                state.pokemon = null;
                state.message = "Sucesso!";
            }).addCase(deletePokemon.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.success = false;
                state.pokemon = null;
                state.message = action.payload.message;
            })
    }
})

export const { reset } = pokemonSlice.actions;
export default pokemonSlice.reducer;