import styles from './pokemonSearch.module.css'

import { FcSearch } from 'react-icons/fc'

//hooks
import { useState } from 'react'
import { useSelector } from 'react-redux'

//components
import Pokemon from '../pokemon/pokemon'
import Message from '../message/message'

const PokemonSearch = ({pokemon,nameSearchPokemon}) => {

  const [name, setName] = useState('');
  
  const {
    error:errorPokemon,
  } = useSelector((state)=>state.pokemon);

  return (
    <div className={styles.searchContainer}> 
    {errorPokemon && <Message msg={'Oops... Nunhum pokemon encontrado!'} type='error' />}
        <div className={styles.contentSearch}>
            <div className={styles.searchField}>
                <input type="text" placeholder='busque por nome ou id...' onChange={(e)=>{setName(e.target.value)}}  onKeyUp={(e)=>{if(e.keyCode === 13){nameSearchPokemon(name)} }} />
                <button onClick={()=>{nameSearchPokemon(name)}} > <FcSearch/> </button>
            </div>
            { pokemon && <Pokemon pokemon={pokemon} />}
        </div>
    </div>
  )

}

export default PokemonSearch