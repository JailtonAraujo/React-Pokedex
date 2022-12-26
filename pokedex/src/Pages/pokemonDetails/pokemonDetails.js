import styles from './pokemonDetails.module.css'

//hooks
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { searchPokemon } from '../../slices/pokemonSlice'
import { useParams } from 'react-router-dom'

const PokemonDetails = () => {

  const dispath = useDispatch();

  const {id:pokemonId} = useParams();

  const {
    pokemon,
    error:errorPokemon,
    loading:loadingPokemon,
  } = useSelector((state)=>state.pokemon);


  useEffect(()=>{
    dispath(searchPokemon(pokemonId));
  },[])

  return (
    <>{ pokemon && 
    <div className='container'>
      <div className={styles.containerDatils}>
        <div className={styles.content}>

          <div className={styles.title}>
            <h1>{ `${pokemon.name} Nº ${pokemon.id}` }</h1>
          </div>

          <div className={styles.infoContainer}>

            <div className={styles.image}>
              <img src={pokemon.sprites.other["official-artwork"].front_default} alt="img_pokemon" />
            </div>

            <div className={styles.informations}>

              <div className={styles.flavorText}>
                Its plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.
              </div>

              <div className={styles.specifications}>
                <div className={styles.specificationsContent}>

                  <div className={styles.collumn01}>
                      <ul>
                        <li>
                          <span className='attributeTitle'> Height: </span>
                          <span className={styles.attributeValue}> {(pokemon.height / 10).toFixed(1) } m  </span>
                        </li>
                        <li>
                          <span className='attributeTitle'> Weight: </span>
                          <span className={styles.attributeValue}>{(pokemon.weight / 10).toFixed(1)} Kg  </span>
                        </li>
                        <li>
                          <span className='attributeTitle'> Gender: </span>
                          <span className={styles.attributeValue}> attributeValue  </span>
                        </li>
                      </ul>
                  </div>

                  <div className={styles.collumn02}>
                      <ul>
                      <li>
                          <span className='attributeTitle'> Category: </span>
                          <span className={styles.attributeValue}> attributeValue  </span>
                        </li>
                        <li>
                          <span className='attributeTitle'> Abilities: </span>
                          <span className={styles.attributeValue}> attributeValue  </span>
                        </li>
                      </ul>      
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className="statsContainer">

          </div>

        </div>
      </div>
    </div>
    }
    </>
  )
}

export default PokemonDetails