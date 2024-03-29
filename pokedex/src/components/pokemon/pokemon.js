import styles from './pokemon.module.css'
import { useState, useEffect } from 'react';

//icons
import {AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'

import { Link, useNavigate } from 'react-router-dom';

//context
import { useAuthValue } from '../../context/authContext'

//slices
import { favoritePokemon, deletePokemon } from '../../slices/pokemonSlice'; 
import { useDispatch } from 'react-redux';

const Pokemon = ({pokemon,favorited}) => {

  const [number, setNumber] = useState('');
  const [favority, setFavority] = useState(false);
  const {user} = useAuthValue();

  const dispath = useDispatch();
  const navigate = useNavigate();


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

const handlerfavorite = async () =>{

  if(user){
    const document = {...pokemon, uid:user.uid}
  
    dispath(favoritePokemon(document));
    setFavority(true);
    return;
  }

  navigate('/login')

}

const handlerDelete = () =>{

  const pokemonToDel ={
    id:pokemon.id,
    idDoc:pokemon.idDoc
  }
 

  dispath(deletePokemon(pokemonToDel));

}

useEffect(()=>{
  setFavority(false)
  buildNumber();
},[pokemon])

  return (
    <div className={styles.card}>
     { !favorited && <button className={styles.favority} title="Favoritar" onClick={handlerfavorite}> 
      { favority ? <AiFillStar/> : <AiOutlineStar/> } </button>}

      {favorited && <button className={styles.remove} title="Remover" onClick={handlerDelete}> 
      {<TiDelete/>} </button>}

      <Link to={`/pokemon/datails/${pokemon.id}`}>
      <div className={styles.content}>
        <div id={styles.pokemon_img}>
        <img src={pokemon.image} alt="img_pokemon" />
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
      </Link>
    </div>
  )
}

export default Pokemon