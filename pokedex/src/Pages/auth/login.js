import styles from './auth.module.css'

//hooks
import { useState } from 'react';
import { Link } from 'react-router-dom';

//icons
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

const Login = () => {

  const [hide, setHide] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const user = {
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
            <h1>Login</h1>
          </div>

          <form onSubmit={(e) => { handlerSubmit(e) }}>
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

            <input type="submit" value="Login" />

          </form>
          <div className={styles.bottom_text}> <Link to="/register"> Cadastre-se agora! </Link> </div>
        </div>
      </div>
    </div>
  )
}

export default Login;