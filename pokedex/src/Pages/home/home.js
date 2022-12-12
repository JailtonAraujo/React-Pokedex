//components
import Pokemonlist from '../../components/pokemonlist/pokemonlist'

//redux
import {resetMessage, getPokemonsFromApi, getPokemonByidApi} from '../../slices/pokemonSlice'

//hooks
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Home = () => {

  const dispath = useDispatch();

  const findPokemonsFromApi = async () =>{

    const res = await dispath(getPokemonsFromApi());

    console.log(res.payload);

  };

  const findPokemonById = async (idPokemon) =>{
    const res = await dispath(getPokemonByidApi(2));

    console.log(res.payload);
  }

  //findPokemonsFromApi();

  findPokemonById(1);

  useEffect(()=>{
    dispath(resetMessage());
  },[dispath]);

  return (
    <div>
        <h2>Bem vindo ao Pokeworld!</h2>
        <Pokemonlist/>
    </div>
  )
}

export default Home