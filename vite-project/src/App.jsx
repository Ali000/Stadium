import './App.css'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import MatchesList from './pages/MatchesList'
import StadiumsList from './pages/StadiumsList'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
const App = () => {
  return (
    <div>
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/MatchesList" element={<MatchesList />} />
          <Route path="/StadiumsList" element={<StadiumsList />} />
          <Route path='/About' element={<About />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register/>} />
        </Routes>
      </main>
    </div>
  )
}
export default App
