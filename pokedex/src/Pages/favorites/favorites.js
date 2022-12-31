import styles from '../home/home.module.css'

//hooks
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";

//slice
import { findPokemonsByUid, searchPokemonFromDb, nextPagePokemonsFirebase, reset } from '../../slices/pokemonSlice';

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
    loading: loadingPokemon
  } = useSelector((state) => state.pokemon);

  //received name search to pokemonSeachComponent for home(father)
  const nameSearchPokemon = async (name)=>{
    if(name){
      
      const objSearch = {
        uid:user.uid,
        name:name.toLowerCase()
      }

    dispath(searchPokemonFromDb(objSearch));
    return
    }
    return
  }

  const nextPage = async () =>{

    const docRef = pokemons[(pokemons.length-1)];

    dispath(nextPagePokemonsFirebase(docRef));

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
     { pokemons && pokemons.length === 0 ? <></> :<PokemonSearch pokemon={pokemon} nameSearchPokemon={nameSearchPokemon} favorited={true} txtPlacehold="Busque por nome..."/>}
      <div className={styles.contente_list}>
        <ul className={styles.list}>
          {pokemons && pokemons.length === 0 ? <h1 className={styles.notFavorites}>Sem favoritos...</h1> : pokemons && pokemons.map((pokemon, index) => (
            <li key={index} > <Pokemon pokemon={pokemon} favorited={true}/> </li>
          )) }
        </ul>
      </div>

     <div className={styles.findMore}>
          {!loadingPokemon && <button onClick={(e)=>{nextPage(e)}}>Carregar mais...</button>}
          {loadingPokemon && <button disabled >Aguarde...</button>}
        </div>

      <button onClick={() => { window.scrollTo(0, 0) }} className={styles.btnBackToTop}><FiCornerRightUp /></button>
    </div>
  )
}

export default Favorites