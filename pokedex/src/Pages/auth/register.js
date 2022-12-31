import styles from './auth.module.css'

//hooks
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { registerUser, reset } from '../../slices/authSlice'
import { useSelector, useDispatch } from 'react-redux';

//icons
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

import Message from '../../components/message/message';

const Register = () => {

  const dispath = useDispatch();

  const [hide, setHide] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const {
    loading,
    error,
    message
  } = useSelector((state)=>state.auth);

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const user = {
      displayName:name,
      email,
      password
    }

    if(!email || !name || !password){
      return;
    }

    dispath(registerUser(user));
  }

  useEffect(()=>{
    dispath(reset());
  },[])

  return (
    <div className='container'>
      {error && <Message msg={message} type='error'/>}
      <h2 className={styles.msgHero}>Cadastre-se para favoritar pokemons!</h2>
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

          {!loading && <input type="submit" value="Enviar" />}
          {loading && <input type="submit" value="Aguarde..." disabled />}


        </form>
        <div className={styles.bottom_text}> <Link to="/login"> Já tenho uma conta! </Link> </div>
      </div>
    </div>
  </div>
  )
}

export default Register