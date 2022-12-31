import styles from './footer.module.css'

const footer = () => {
  return (
    <fieldset className={styles.footer}>
       <legend><img src="/pokedex/pokebola.png" alt="" /></legend>
        <p>
          Pokedex &copy; 2022
        </p>
      </fieldset>
  )
}

export default footer