import {urlApiPokedex} from '../environments/environment'


const getAllPokemons = async () => {

    try {
        
        const data = await getPokemons();
        
        const promises = data.results.map( async (pokemon) =>{
            return await getPokemonData(pokemon.url);
        });

        const results = await Promise.all(promises);

       return results;


    } catch (error) {
        console.log(error);
    }

}


const getPokemons = async () => {

    try {
        
        const response = await fetch(`${urlApiPokedex}?limit=12&offset=0`)

        return await response.json();

    } catch (error) {
        console.log(error);
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

const pokemonService = {
    getPokemonByidApi,
    getPokemonData,
    getAllPokemons,
    getPokemons
}

export default pokemonService;