import styles from'./header.css'

const header = () => {
  return (
    <nav className='navbar'>
      <fieldset>
      <div className="brand">
        <img src="https://cdn-icons-png.flaticon.com/512/287/287221.png" alt="" />
      </div>
      <ul className='links'>
        <li>Entrar</li>
        <li>Cadastrar</li>
      </ul>
      {/* <legend> <img src="https://cdn-icons-png.flaticon.com/512/287/287221.png" alt="" /></legend> */}
      </fieldset>
    </nav>
  )
}

export default header