import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    <div>
      <nav className="nav-bar">
        <Link to="/Home">Home</Link>
        <Link to="/MatchesList">MatchesList</Link>
        <Link to="/StadiumsList">StadiumsList</Link>
        <Link to="/About">About</Link>
        <Link to="/Login">Login</Link>
        <Link to="/TeamsList">TeamsList</Link>
      </nav>
    </div>
  )
}
export default Nav
