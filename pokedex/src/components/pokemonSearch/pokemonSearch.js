import React from 'react'
import styles from './pokemonSearch.css'

import { FcSearch } from 'react-icons/fc'

const PokemonSearch = ({pokemon}) => {

  return (
    <div className='searchContainer'>
        <div className="contentSearch">
            <div className="search-field">
                <input type="text" placeholder='busque por nome ou id...'/>
                <button> <FcSearch/> </button>
            </div>

        </div>
    </div>
  )

}

export default PokemonSearch