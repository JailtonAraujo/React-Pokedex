import styles from './pokemonlist.css'

//components
import Pokemon from '../pokemon/pokemon'

const Pokemonlist = ({pokemons}) => {

  return (
    <div className='contente-list'>
        <ul className="list">
          {pokemons && pokemons.map((pokemon, index)=>(
            <li key={index} > <Pokemon pokemon={pokemon}/> </li>
          ))}
        </ul>
    </div>
  )
}

export default Pokemonlist