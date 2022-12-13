import syles from './home.css'

//components
import Pokemonlist from '../../components/pokemonlist/pokemonlist'

//redux
import {reset, getPokemonsFromApi, getPokemonByidApi} from '../../slices/pokemonSlice'

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

  const getPokemons =  () =>{
    let list = [];
    for(let i = 1; i<10;i++){
      
    dispath(getPokemonByidApi(i));
      
      list.push(pokemon);
    }

    console.log(list);

  }


  useEffect(()=>{
    dispath(reset());
  },[dispath]);

  return (
    <div>
        {/* {loadingPokemon && <Loading/>} */}
        <h2>Bem vindo ao Pokeworld!</h2>
        <Pokemonlist/>
        <div className="findMore">
          {!loadingPokemon && <button onClick={getPokemons}>Carregar mais...</button>}
          {loadingPokemon && <button disabled >Agurade...</button>}
        </div>
    </div>
  )
}

export default Home