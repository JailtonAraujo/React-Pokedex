import styles from'./header.module.css'
import { Link } from 'react-router-dom'

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
        <li><Link to="/login">Entrar</Link></li>
        <li> <Link to="/register">Cadastrar</Link> </li>
        </>}

        {user &&
        <>
        <li> <button onClick={logOut}>Sair</button> </li>
        <li> <Link to="/pokemons/favorites">Favoritos</Link> </li>
        </>
        }

      </ul>
      </fieldset>
    </nav>
  )
}

export default Header