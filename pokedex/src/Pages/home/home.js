import syles from './home.css'

//components
import Pokemonlist from '../../components/pokemonlist/pokemonlist'

//redux
import {reset} from '../../slices/pokemonSlice'
import { getAllPokemons } from '../../slices/pokemonSlice';

//hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from '../../components/loading/loading';

const Home = () => {

  const dispath = useDispatch();

  const [offset, setOffset] = useState(0);

  const {
  pokemons,
  error:errorPokemon,
  loading:loadingPokemon,
} = useSelector((state)=>state.pokemon);

  useEffect(()=>{
    dispath(getAllPokemons(12,offset));
    dispath(reset());
  },[]);

  return (
    <div>
        {pokemons && <Pokemonlist pokemons={pokemons}/>}
        <div className="findMore">
          {!loadingPokemon && <button>Carregar mais...</button>}
          {loadingPokemon && <button disabled >Agurade...</button>}
        </div>
    </div>
  )
}

export default Home