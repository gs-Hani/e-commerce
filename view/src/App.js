import   React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { RegisterOrLogin } from './features/registration/Registration & Login';
import { Shop }            from './features/shop/Shop';

import './App.css';

function App() {
  
  return (
    <div className="App"> 
      <Router className='Router'>
        {/* <Header id='Header'/> */}
        {/* <aside>
          <Subreddits />
        </aside>  */}
        <main>
          <Routes>
            <Route exact path={`/auth`} element={<RegisterOrLogin/>}/>
            <Route exact path={`/`}     element={<Shop/>}           />
          </Routes>
        </main> 
          
      </Router>
    </div>
  )
}

export default App;
