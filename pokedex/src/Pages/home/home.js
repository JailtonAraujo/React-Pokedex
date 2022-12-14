import syles from './home.css'

//components
import Pokemonlist from '../../components/pokemonlist/pokemonlist'

//redux
import {reset} from '../../slices/pokemonSlice'
import { getAllPokemons } from '../../slices/pokemonSlice';

//hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from '../../components/loading/loading';

const Home = () => {

  const dispath = useDispatch();

  const {pokemon,
  pokemons,
  error:errorPokemon,
  loading:loadingPokemon,
  message,
} = useSelector((state)=>state.pokemon);

  console.log(pokemons)

  useEffect(()=>{
    dispath(getAllPokemons());
    dispath(reset());
  },[]);

  return (
    <div>
        {/* {loadingPokemon && <Loading/>} */}
        <h2>Bem vindo ao Pokeworld!</h2>
        <Pokemonlist/>
        <div className="findMore">
          {!loadingPokemon && <button>Carregar mais...</button>}
          {loadingPokemon && <button disabled >Agurade...</button>}
        </div>
    </div>
  )
}

export default Home