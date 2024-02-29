import './App.css'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import MatchesList from './pages/MatchesList'
import StadiumsList from './pages/StadiumsList'
import About from './pages/About'
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
        </Routes>
      </main>
    </div>
  )
}
export default App
