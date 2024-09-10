import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Landing from './components/LandingPage/Landing';
import Home from './components/HomePage/Home';
import ActiveProject from './components/ActiveProject/ActiveProject';
import CreateProject from './components/CreateProject/CreateProject';
import Backlog from './components/ActiveProject/Backlog/Backlog';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/create-project' element={<CreateProject/>}/>
          <Route path='/project' element={<ActiveProject/>}/>
          <Route path='/backlog' element={<Backlog/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
