import styles from'./header.css'
import { Link } from 'react-router-dom'

const header = () => {

  return (
    <nav className='navbar'>
      <fieldset>
      <div className="brand">
        <Link to="/">
        <img src="https://cdn-icons-png.flaticon.com/512/287/287221.png" alt="" />
        </Link>
      </div>
      <ul className='links'>
        <li><Link to="/login">Entrar</Link></li>
        <li> <Link to="/register">Cadastrar</Link> </li>
      </ul>
      {/* <legend> <img src="https://cdn-icons-png.flaticon.com/512/287/287221.png" alt="" /></legend> */}
      </fieldset>
    </nav>
  )
}

export default header