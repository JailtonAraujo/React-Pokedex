import styles from '../home/home.module.css'

//hooks
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";

//slice
import { findPokemonsByUid,searchPokemon, reset } from '../../slices/pokemonSlice';

//context
import { useAuthValue } from '../../context/authContext'

//components
import Pokemon from '../../components/pokemon/pokemon';
import PokemonSearch from '../../components/pokemonSearch/pokemonSearch';

//icons
import { FiCornerRightUp } from 'react-icons/fi'


const Favorites = () => {


  const { user } = useAuthValue();
  const dispath = useDispatch();

  const {
    pokemons,
    pokemon,
    loading: loadingPokemon,
  } = useSelector((state) => state.pokemon);

  //received name search to pokemonSeachComponent for home(father)
  const nameSearchPokemon = async (name)=>{
    if(name){
    dispath(searchPokemon(name.toLowerCase()))
    return
    }
    return
  }

  useEffect(() => {

    const objSearch = {
      uid: user.uid,
      docRef: ""
    }

    dispath(findPokemonsByUid(objSearch));
    dispath(reset());

  }, [])

  return (
    <div>

     { pokemons && pokemons.length === 0 ? <></> :<PokemonSearch pokemon={pokemon} nameSearchPokemon={nameSearchPokemon} favorited={true}/>}
      <div className={styles.contente_list}>
        <ul className={styles.list}>
          {pokemons && pokemons.length === 0 ? <h1 className={styles.notFavorites}>Sem favoritos...</h1> : pokemons && pokemons.map((pokemon, index) => (
            <li key={index} > <Pokemon pokemon={pokemon} favorited={true}/> </li>
          )) }
        </ul>
      </div>
      <button onClick={() => { window.scrollTo(0, 0) }} className={styles.btnBackToTop}><FiCornerRightUp /></button>
    </div>
  )
}

export default Favorites