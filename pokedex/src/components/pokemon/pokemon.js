import styles from './pokemon.module.css'
import { useState, useEffect } from 'react';

const Pokemon = ({pokemon}) => {

  const [number, setNumber] = useState('');

  const buildNumber = async () =>{
    const id = pokemon.id;
    if(id < 10){  
      setNumber(`00${id}`);
    }else if(id < 100){
      setNumber(`0${id}`);
    }else if (id >= 100){
      setNumber(id);
    }
}

useEffect(()=>{
  buildNumber();
},[pokemon])

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div id={styles.pokemon_img}>
        <img src={pokemon.sprites.other["official-artwork"].front_default} alt="img_pokemon" />
        </div>
        <div className={styles.footer_card}>
          <span id={styles.number}>
            Nº {number}
          </span>
          <p id={styles.name}>
            {pokemon.name}
          </p>
          <ul className={styles.types}>
              { pokemon.types && pokemon.types.map((type, index)=>(
                <li key={index} className={type.type.name}>{type.type.name}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Pokemon