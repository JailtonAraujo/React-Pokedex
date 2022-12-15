import styles from './pokemon.css'
import { useState, useEffect } from 'react';

const Pokemon = ({pokemon}) => {

  const [img, setImg] = useState('');
  const [number, setNumber] = useState('');

  const buildImage = async () =>{

    let urlImage = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
    const id = pokemon.id;

    if(id < 10){
      urlImage = `${urlImage}/00${id}.png`;
      setNumber(`00${id}`);
    }else if(id < 100){
      urlImage = `${urlImage}/0${id}.png`;
      setNumber(`0${id}`);
  }
  setImg(urlImage);
}

useEffect(()=>{
  buildImage();
},[])

  return (
    <div className='card'>
      <div className="content">
        <div id="pokemon_img">
        <img src={img} alt="img_pokemon" />
        </div>
        <div className="footer_card">
          <span id="number">
            Nº {number}
          </span>
          <p id="name">
            {pokemon.name}
          </p>
          <ul className="types">
              { pokemon.types && pokemon.types.map((type)=>(
                <li className={type.type.name}>{type.type.name}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Pokemon