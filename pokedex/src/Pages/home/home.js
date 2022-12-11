import styles from './home.css'

//components
import Pokemonlist from '../../components/pokemonlist/pokemonlist'


const home = () => {
  return (
    <div>
        <h2>Bem vindo ao Pokeworld!</h2>
        <Pokemonlist/>
    </div>
  )
}

export default home