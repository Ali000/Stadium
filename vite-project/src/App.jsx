import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import Nav from './components/Nav'
import Home from './pages/Home'
import MatchesList from './pages/MatchesList'
import StadiumsList from './pages/StadiumsList'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
const App = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      checkToken();
    }
  }, []);

  const checkToken = async () => {
    const user = await CheckSession();
    console.log(user);
    setUser(user);
  }

  return (
    <div>
      <header>
        <Nav user={user}/>
      </header>
      <main>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/MatchesList" element={<MatchesList />} />
          <Route path="/StadiumsList" element={<StadiumsList />} />
          <Route path='/About' element={<About />} />
          <Route path='/Login' element={<Login setUser={setUser} />} />
          <Route path='/Register' element={<Register/>} />
        </Routes>
      </main>
    </div>
  )
}
export default App
