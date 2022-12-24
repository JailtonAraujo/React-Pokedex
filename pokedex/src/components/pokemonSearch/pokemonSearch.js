import React from 'react'
import styles from './pokemonSearch.css'

import { FcSearch } from 'react-icons/fc'

import { useState } from 'react'
import Pokemon from '../pokemon/pokemon'

const PokemonSearch = ({pokemon,nameSearchPokemon}) => {

  const [name, setName] = useState(''); 

  return (
    <div className='searchContainer'>
        <div className="contentSearch">
            <div className="search-field">
                <input type="text" placeholder='busque por nome ou id...' onChange={(e)=>{setName(e.target.value)}} />
                <button onClick={()=>{nameSearchPokemon(name)}} > <FcSearch/> </button>
            </div>
            { pokemon.id && <Pokemon pokemon={pokemon} />}
        </div>
    </div>
  )

}

export default PokemonSearch