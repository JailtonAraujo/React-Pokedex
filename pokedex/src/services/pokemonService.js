import {urlApiPokedex} from '../environments/environment'
import { collection, addDoc, Timestamp, query, where, orderBy, onSnapshot, QuerySnapshot, getDocs } from 'firebase/firestore';
import {db} from "../Firebase/config";


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

const getPokemonSpecies = async (id) =>{

    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

    try {
        
        const response = await fetch(url);

        return await response.json();


    } catch (error) {
        return error = {status:404, message:'pokemon not found', cause:error};
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

const favoritePokemon = async (document) =>{

    try {

        const newDocument = {...document, createdAt: Timestamp.now()};
        
        const data = await addDoc(
            collection(db,"pokemon"),newDocument
        );

        return data;

    } catch (error) {
        console.log(error)
        return error = {status:500, message:'Erro ao favoritar pokemon!', cause:error};
    }

}

const findAllPokemonsByUid = async ( objSearch ) =>{

    const collectionRef = collection (db,"pokemon");

    try {

        const q = query(collectionRef, where("uid","==",objSearch.uid),
        orderBy("createdAt","desc"));
      
        const data = await getDocs(q);

      const promises = data.docs.map( async (doc)=>{

           return await getPokemonData(`${urlApiPokedex}/${doc.data().id}`);

        })

        const results = await Promise.all(promises);

        return results;

    } catch (error) {
        console.log(error)
        return error = {status:404, message:'Erro ao listar pokemons!', cause:error};
    }

}

const pokemonService = {
    getPokemonByidApi,
    getAllPokemons,
    nextPagePokemons,
    searchPokemon,
    getPokemonSpecies,
    favoritePokemon,
    findAllPokemonsByUid
}

export default pokemonService;