import {urlApiPokedex} from '../environments/environment'


const getAllPokemons = async (limit,offset) => {

    try {
        
        const data = await getPokemons(limit,offset);
        
        const promises = data.results.map( async (pokemon) =>{
            return await getPokemonData(pokemon.url);
        });

        const results = await Promise.all(promises);

       return results;


    } catch (error) {
        console.log(error);
    }

}

const nextPagePokemons = async (offset) =>{

    const result = await getAllPokemons(8,offset);

    return result;

}


const getPokemons = async (limit,offset) => {

    try {
        
        const response = await fetch(`${urlApiPokedex}?limit=${limit}&offset=${offset}`)

        return await response.json();

    } catch (error) {
        console.log(error);
        return error
    }

}

const getPokemonByidApi = async (idPokemon) =>{
    
    try {

        const res = await fetch(`${urlApiPokedex}/${idPokemon}`)
        .then((res)=>res.json())
        .catch((err)=> err);

        return res;
        
    } catch (error) {
        console.log(error);
        
    }
}

const getPokemonData = async (url) =>{
    
    try {

        const response = await fetch(url)
        return await response.json()
        
    } catch (error) {
        console.log(error);
    }
}

const searchPokemon = async (search) =>{

    try {
        
        const response = await fetch(`${urlApiPokedex}/${search}`);

        return  await response.json();

    } catch (error) {
        return error = {status:404, message:'pokemon not found', cause:error};
    }

}

const pokemonService = {
    getPokemonByidApi,
    getAllPokemons,
    nextPagePokemons,
    searchPokemon
}

export default pokemonService;