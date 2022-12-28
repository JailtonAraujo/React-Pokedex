import styles from './auth.module.css'

//hooks
import { useState } from 'react';
import { Link } from 'react-router-dom';

//icons
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

const Register = () => {


  const [hide, setHide] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password
    }

    console.log(user);
  }

  return (
    <div className='container'>
    <div className={styles.container_auth}>

      <div className={styles.content}>

        <div className={styles.title}>
          <h1>Cadastrar</h1>
        </div>

        <form onSubmit={(e) => { handlerSubmit(e) }}>

        <div className={styles.form_group}>
            <label htmlFor="name">Nome:</label>
            <input type="text" placeholder='Informe seu nome...' name='email' onChange={(e) => { setName(e.target.value) }} />
          </div> 

          <div className={styles.form_group}>
            <label htmlFor="email">E-mail:</label>
            <input type="email" placeholder='Informe seu e-mail...' name='email' onChange={(e) => { setEmail(e.target.value) }} />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="password">Senha:</label>
            <div className={styles.password_field}>
              <input type={ hide ? 'password' : 'text' } placeholder='Informe sua senha...' name='password' onChange={(e) => { setPassword(e.target.value) }} />
              <button onClick={()=>{setHide(!hide)}} type="button"> { hide ? <AiFillEyeInvisible/> :<AiFillEye/> } </button>
            </div>
          </div>

          <input type="submit" value="Enviar" />

        </form>
        <div className={styles.bottom_text}> <Link to="/login"> Já tenho uma conta! </Link> </div>
      </div>
    </div>
  </div>
  )
}

export default Register