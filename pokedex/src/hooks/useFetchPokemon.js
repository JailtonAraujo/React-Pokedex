import { useState, useEffect } from "react";

import pokemonService from "../services/pokemonService";

export const useFetchPokemon = () =>{

    const [error, setError ] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemons] = useState([]);

    const getAllPokemons = async () =>{

        try {
            setLoading(true);

            setPokemons( await pokemonService.getAllPokemons());

            setLoading(false);

        } catch (error) {
            console.log(error)
            setError(true);
            setLoading(false);
        }
    }
	
    return {loading,error,pokemons, getAllPokemons};
};