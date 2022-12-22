import syles from './home.css'

//components
import Pokemonlist from '../../components/pokemonlist/pokemonlist'
import PokemonSearch from '../../components/pokemonSearch/pokemonSearch';

//redux
import {reset} from '../../slices/pokemonSlice'
import { getAllPokemons, nextPagePokemons } from '../../slices/pokemonSlice';

//hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {

  const dispath = useDispatch();

  const [offset, setOffset] = useState(12);

  const {
  pokemons,
  error:errorPokemon,
  loading:loadingPokemon,
} = useSelector((state)=>state.pokemon);

  const nextPage = () =>{

   dispath(nextPagePokemons(offset));

   setOffset(offset+8);

  }

  useEffect(()=>{
    dispath(getAllPokemons(12, offset));
    dispath(reset());
  },[]);


  return (
    <div>
        <PokemonSearch/>
        {pokemons && <Pokemonlist pokemons={pokemons}/>}
        <div className="findMore">
          {!loadingPokemon && <button onClick={nextPage}>Carregar mais...</button>}
          {loadingPokemon && <button disabled >Aguarde...</button>}
        </div>
          <button onClick={()=>{window.scrollTo(0,0)}} className="btnBackToTop">Top</button>
    </div>
  )
}

export default Home