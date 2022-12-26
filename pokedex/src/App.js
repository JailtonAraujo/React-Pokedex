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

import { useSelector } from 'react-redux';

function App() {

  const {
    loading:loadingPokemon,
  } = useSelector((state)=>state.pokemon);

  return (
    <div className="App">
      {loadingPokemon && <Loading/>}
      {<Message/>}
      <BrowserRouter>
        <Header/>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/pokemon/datails/:id' element={<PokemonDetails/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
