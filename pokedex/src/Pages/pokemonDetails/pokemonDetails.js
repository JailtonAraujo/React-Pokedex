import styles from './pokemonDetails.module.css'

const PokemonDetails = () => {
  return (
    <div className='container'>
      <div className={styles.containerDatils}>
        <div className={styles.content}>

          <div className={styles.title}>
            <h1>Venusaur Nº 003</h1>
          </div>

          <div className={styles.infoContainer}>

            <div className={styles.image}>
              <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png" alt="img_pokemon" />
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
                          <span className={styles.attributeValue}> attributeValue  </span>
                        </li>
                        <li>
                          <span className='attributeTitle'> Weight: </span>
                          <span className={styles.attributeValue}> attributeValue  </span>
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
  )
}

export default PokemonDetails