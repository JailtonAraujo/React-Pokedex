import styles from './pokemonDetails.module.css'

//hooks
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { searchPokemon,getPokemonSpecies } from '../../slices/pokemonSlice'
import { Link, useParams } from 'react-router-dom'

//icons
import {AiOutlineMan, AiOutlineWoman} from 'react-icons/ai'
import { TiArrowBack } from 'react-icons/ti'

const PokemonDetails = () => {

  const dispath = useDispatch();

  const {id:pokemonId} = useParams();

  const {
    pokemon,
    pokemonSpecie,
  } = useSelector((state)=>state.pokemon);

  useEffect(()=>{
    dispath(searchPokemon(pokemonId));
    dispath(getPokemonSpecies(pokemonId));
  },[])

  return (
    <>{ pokemon && 
    <div className='container'>
      <div className={styles.containerDatils}>

        <fieldset className={styles.content}>

          <legend><img src="/pokedex/pokebola_details.png" alt="" /></legend>

          <div className={styles.title}>
            <h1  >{ `${pokemon.name} Nº ${pokemon.id}` }</h1>
          </div>

          <div className={styles.infoContainer}>

            <div className={styles.image}>
              <img src={pokemon.image} alt="img_pokemon" />
            </div>

            <div className={styles.informations}>

              {pokemonSpecie && <div className={styles.flavorText}>
                {  pokemonSpecie  }
              </div>}

              <div className={styles.types}>
                <ul>
                  { pokemon.types && pokemon.types.map((type, index)=>(
                    <li key={index} className={type.type.name}>{type.type.name}</li>
                  ))}
                  </ul>
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
                          <span className={styles.attributeValue}> <AiOutlineMan/> <AiOutlineWoman/>  </span>
                        </li>
                      </ul>
                  </div>

                  <div className={styles.collumn02}>
                      <ul>
                      {/* <li>
                          <span className='attributeTitle'> Category: </span>
                          <span className={styles.attributeValue}> attributeValue  </span>
                        </li> */}
                        <li>
                          <span className='attributeTitle'> Abilities: </span>
                          <span className={styles.attributeValue}> {pokemon.ability}  </span>
                        </li>
                      </ul>      
                  </div>
                </div>
              </div>

            </div>

          </div>
            <div className={styles.btnBack}>
              <Link to={'/'} ><TiArrowBack/> Voltar</Link>
            </div>              
        </fieldset>
      </div>
    </div>
    }
    </>
  )
}

export default PokemonDetails