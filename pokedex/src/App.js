import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

//components
import Footer from './components/footer/footer'
import Header from  './components/header/header'

//pages
import Home from './Pages/home/home';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Header/>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
