import styles from './pokemonlist.css'

//components
import Pokemon from '../pokemon/pokemon'

const pokemonlist = ({list}) => {

  return (
    <div className='contente-list'>
        <ul className="list">
            <li> <Pokemon/> </li>
            <li> <Pokemon/> </li>
            <li> <Pokemon/> </li>
            <li> <Pokemon/> </li>
            <li> <Pokemon/> </li>
            <li> <Pokemon/> </li>
            <li> <Pokemon/> </li>
            <li> <Pokemon/> </li>
            <li> <Pokemon/> </li>
            <li> <Pokemon/> </li>
            <li> <Pokemon/> </li>
            <li> <Pokemon/> </li>
        </ul>
    </div>
  )
}

export default pokemonlist