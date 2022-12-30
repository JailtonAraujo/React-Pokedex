import styles from'./header.module.css'
import { Link, NavLink } from 'react-router-dom'

import { useAuthValue } from '../../context/authContext'
import { getAuth, signOut } from 'firebase/auth'

const Header = () => {

  const { user } = useAuthValue();

  const logOut = async  () =>{
      const auth = getAuth()
      await signOut(auth);
  }

  return (
    <nav className={styles.navbar}>
      <fieldset>
      <div className={styles.brand}>
        <Link to="/">
        <img src="https://cdn-icons-png.flaticon.com/512/287/287221.png" alt="" />
        </Link>
      </div>
      <ul className={styles.links}>
        
        { !user && <>
        <li><NavLink to="/login" className={({isActive}) => (isActive ? styles.active : '')} >Entrar</NavLink></li>
        <li> <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : '')} >Cadastrar</NavLink> </li>
        </>}

        {user &&
        <>
        <li> <button onClick={logOut}>Sair</button> </li>
        <li> <NavLink to="/pokemons/favorites" className={({isActive}) => (isActive ? styles.active : '')} >Favoritos</NavLink> </li>
        </>
        }

      </ul>
      </fieldset>
    </nav>
  )
}

export default Header