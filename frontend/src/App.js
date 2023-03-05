
import {useState} from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css';
import Landingpage from './landingpage/Landingpage';
import Signup from './components/Signup/signup'; 
import Login from './components/login/login';
import Home from './components/home/home';
import SideLeft from './components/sideLeft/sideLeft';
import InputQuestion from './components/inputQuestion/inputeQuestion';
import Ajout from './components/AjoutEtudiant/Ajout';
import Mycontext from './context/Mycontext'
import Profil from './components/UserProfil/UserProfil';
import Club from './components/club/Club'
import Modification from './components/Modification/Modification';
import StaffClub from './components/staffClub/staffClub';
function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')))


  return (
    <div className="App">
      <Mycontext.Provider value={{user,setUser,token,setToken}}>
          <Routes>
            <Route path="/" element={<Landingpage/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/logIn" element={<Login/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/sideleft" element={<SideLeft/>}/>
            <Route path="/ajout" element={<Ajout/>}/>
            <Route path="/profil" element={<Profil/>}/>
            <Route path="/modif" element={<Modification/>}/>
            <Route path="/staffClub" element={<StaffClub/>}/>
          </Routes>
      </Mycontext.Provider>
    </div>
  );
}

export default App;
