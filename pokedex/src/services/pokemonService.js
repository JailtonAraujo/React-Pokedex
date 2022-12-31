import {urlApiPokedex} from '../environments/environment'
import { collection, addDoc, Timestamp, query, where, orderBy, getDocs, limit, startAfter, deleteDoc, doc} from 'firebase/firestore';
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
        return {status:404, message:'pokemon not found', cause:error};
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
        return {status:404, message:'pokemon not found', cause:error};
    }

}

const favoritePokemon = async (document) =>{

    try {

        const collectionRef = collection (db,"pokemon");

        const q = query(collectionRef, where("uid","==",document.uid), where("id","==",document.id));

        const result = (await getDocs(q)).docs.map((doc)=>{
            return {...doc.data()}
        })

        if(result.length > 0){
            return {status:500, message:'pokemon ja favoritado!', cause:"pokemon already exists in your favorites!"};
        }

        const newDocument = {...document, createdAt: Timestamp.now()};
        
        addDoc(
            collection(db,"pokemon"),newDocument
        );

        return document;

    } catch (error) {
        console.log(error)
        return {status:500, message:'Erro ao favoritar pokemon!', cause:error};
    }

}


const findAllPokemonsByUid = async ( objSearch ) =>{

    const collectionRef = collection (db,"pokemon");

    try {

        const q = query(collectionRef, where("uid","==",objSearch.uid),
        orderBy("createdAt","asc"),limit(12));
      
        const data = (await getDocs(q)).docs.map((doc)=>{
            return {...doc.data(), idDoc:doc.id}
        });

        return data;

    } catch (error) {
        console.log(error)
        return {status:404, message:'Erro ao listar pokemons!', cause:error};
    }

}


const nextPagePokemonsDb = async (docRef) =>{
    
    const collectionRef = collection (db,"pokemon");

    try {
  
        const q = query(collectionRef, where("uid","==",docRef.uid),orderBy("createdAt","asc"),
          startAfter(docRef.createdAt) ,limit(12));

          const data = (await getDocs(q)).docs.map((doc)=>{
            return {...doc.data(), idDoc:doc.id}
        });

        return data;

    } catch (error) {
        return {status:404, message:'Erro ao listar pokemons!', cause:error};
    }
}

const searchPokemonDb = async (objSearch) =>{

    const collectionRef = collection (db,"pokemon");
    
    try {
        
        const queryId = query(collectionRef, where("uid","==",objSearch.uid),where("name","==",objSearch.name))

        const data = (await getDocs(queryId)).docs.map((doc)=>{
           return {...doc.data(), idDoc:doc.id}
        })

        console.log(data)

        return data[0];

    } catch (error) {
        return  {status:404, message:'pokemon não encontrado', cause:error};
    }

}

const deletePokemonDb = async (pokemonToDel) => {

    const collectionRef = collection (db,"pokemon");

    try {

        
        deleteDoc(doc(collectionRef,pokemonToDel.idDoc));

        return pokemonToDel.id;

    } catch (error) {
        return  {status:500, message:'error in delete pokemon!', cause:error};
    }

}


const pokemonService = {
    getPokemonByidApi,
    getAllPokemons,
    nextPagePokemons,
    searchPokemon,
    getPokemonSpecies,
    favoritePokemon,
    findAllPokemonsByUid,
    nextPagePokemonsDb,
    searchPokemonDb,
    deletePokemonDb
}

export default pokemonService;