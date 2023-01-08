import   React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Registration } from './features/registration/Registration & Login';
import './App.css';

const site = "placeholder";

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
            <Route exact path={`/${site}`} element={<Registration/>}/>
          </Routes>
        </main> 
          
      </Router>
    </div>
  )
}

export default App;
