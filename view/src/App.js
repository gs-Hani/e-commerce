import   React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { Header }          from './components/header/header';
import { RegisterOrLogin } from './features/registration/Registration & Login';
import { Shop }            from './features/shop/Shop';
import { DetailedProduct } from './features/detailedProduct/DetailedProduct';
import { Profile }         from './features/profile/Profile';

import './App.css';

function App() {
  
  return (
    <div className="App"> 
      <Router className='Router'>
        <Header id='Header'/>
        <main>
          <Routes>
            <Route exact path="/auth"       element={<RegisterOrLogin/>}/>
            <Route       path="/"           element={<Shop/>}           />
            <Route       path="/:productId" element={<DetailedProduct/>}/>
            <Route       path="/profile"    element={<Profile/>}/>
          </Routes>
        </main> 
          
      </Router>
    </div>
  )
}

export default App;
