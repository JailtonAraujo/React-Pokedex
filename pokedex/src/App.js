import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

//components
import Footer from './components/footer/footer'
import Header from  './components/header/header'
import Loading from './components/loading/loading';
import Message from './components/message/message';

//pages
import Home from './Pages/home/home';
import PokemonDetails from './Pages/pokemonDetails/pokemonDetails'
import Login from './Pages/auth/login';
import Register from './Pages/auth/register';
import Favorites from './Pages/favorites/favorites';

//hooks
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

//context
import {AuthProvider} from './context/authContext';

function App() {

  const {
    loading:loadingPokemon,
  } = useSelector((state)=>state.pokemon);

  const auth = getAuth();
  const [user, setUSer] = useState(undefined);

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      setUSer(user)
    })
  },[auth])

  return (
    <div className="App">
      <AuthProvider value={{user}}>
      {loadingPokemon && <Loading/>}
      {<Message/>}
      <BrowserRouter>
        <Header/>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home/>}/>

            <Route path='/pokemon/datails/:id' element={<PokemonDetails/>}/>

            <Route path='/login' element={!user ? <Login/> : <Navigate to="/"/>} />

            <Route path='/register' element={ !user ? <Register/> : <Navigate to="/"/> } />

            <Route path='/pokemons/favorites' element={ user ? <Favorites/> : <Navigate to="/login"/> } />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
