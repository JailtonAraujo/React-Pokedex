import styles from './pokemonSearch.css'

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
    loading:loadingPokemon,
  } = useSelector((state)=>state.pokemon);

  return (
    <div className='searchContainer'> 
    {errorPokemon && <Message msg={'Oops... Nunhum pokemon encontrado!'} type='error' />}
        <div className="contentSearch">
            <div className="search-field">
                <input type="text" placeholder='busque por nome ou id...' onChange={(e)=>{setName(e.target.value)}} />
                <button onClick={()=>{nameSearchPokemon(name)}} > <FcSearch/> </button>
            </div>
            { pokemon && <Pokemon pokemon={pokemon} />}
        </div>
    </div>
  )

}

export default PokemonSearch