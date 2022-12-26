import syles from './home.css'

//components
import Pokemonlist from '../../components/pokemonlist/pokemonlist'
import PokemonSearch from '../../components/pokemonSearch/pokemonSearch';

//redux
import {reset} from '../../slices/pokemonSlice'
import { getAllPokemons, nextPagePokemons, searchPokemon } from '../../slices/pokemonSlice';

//hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {

  const dispath = useDispatch();

  const [offset, setOffset] = useState(12);
  const [search, setSearch] = useState('');

  const {
  pokemon,
  pokemons,
  error:errorPokemon,
  loading:loadingPokemon,
} = useSelector((state)=>state.pokemon);

  const nextPage = () =>{
   dispath(nextPagePokemons(offset));
   setOffset(offset+8);
  }

  //received name search to pokemonSeachComponent for home(father)
  const nameSearchPokemon = async (name)=>{
    if(name){
    dispath(searchPokemon(name.toLowerCase()))
    return
    }
    return
  }


  useEffect(()=>{
    dispath(getAllPokemons(12, offset));
    dispath(reset());
  },[]);


  return (
    <div>
        <PokemonSearch pokemon={pokemon} nameSearchPokemon={nameSearchPokemon}/>
        {pokemons && <Pokemonlist pokemons={pokemons}/>}
        <div className="findMore">
          {!loadingPokemon && <button onClick={(e)=>{nextPage(e)}}>Carregar mais...</button>}
          {loadingPokemon && <button disabled >Aguarde...</button>}
        </div>
          <button onClick={()=>{window.scrollTo(0,0)}} className="btnBackToTop">Top</button>
    </div>
  )
}

export default Home