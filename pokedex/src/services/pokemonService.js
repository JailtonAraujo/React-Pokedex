import {urlApiPokedex} from '../environments/environment'

const getPokemonsApi = async () => {

    try {
        
        const res = await fetch(`${urlApiPokedex}?limit=20&offset=0`)
        .then((res)=>res.json())
        .catch((err)=>err);

        return res;

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

const pokemonService = {
    getPokemonsApi,
    getPokemonByidApi
}

export default pokemonService;