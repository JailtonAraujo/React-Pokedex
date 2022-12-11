import styles from './pokemon.css'

const pokemon = () => {

  return (
    <div className='card'>
      <div className="content">
        <div id="pokemon_img">
        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png" alt="img_pokemon" />
        </div>
        <div className="footer_card">
          <span id="number">
            Nº 001
          </span>
          <p id="name">
            Bulbassor
          </p>
          <ul className="types">
              <li className='flying'>Fire</li>
              <li className='poison'>Poison</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default pokemon