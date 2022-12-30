import styles from './home.module.css'

//components
import Pokemon from '../../components/pokemon/pokemon';
import PokemonSearch from '../../components/pokemonSearch/pokemonSearch';

//redux
import {reset} from '../../slices/pokemonSlice'
import { getAllPokemons, nextPagePokemons, searchPokemon } from '../../slices/pokemonSlice';

//hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//icons
import { FiCornerRightUp } from 'react-icons/fi'

const Home = () => {

  const dispath = useDispatch();

  const [offset, setOffset] = useState(12);

  const {
  pokemon,
  pokemons,
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
        <PokemonSearch pokemon={pokemon} nameSearchPokemon={nameSearchPokemon} favorited={false}/>
        
        <div className={styles.contente_list}>
        <ul className={styles.list}>
          {pokemons &&  pokemons && pokemons.map((pokemon, index) => (
            <li key={index} > <Pokemon pokemon={pokemon} favorited={true}/> </li>
          )) }
        </ul>
      </div>

        <div className={styles.findMore}>
          {!loadingPokemon && <button onClick={(e)=>{nextPage(e)}}>Carregar mais...</button>}
          {loadingPokemon && <button disabled >Aguarde...</button>}
        </div>
          <button onClick={()=>{window.scrollTo(0,0)}} className={styles.btnBackToTop}><FiCornerRightUp/></button>
    </div>
  )
}

export default Home