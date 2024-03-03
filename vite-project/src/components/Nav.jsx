import { Link } from 'react-router-dom'
const Nav = ({user, logOut}) => {



  return (
    <div>
      <nav className="nav-bar">
        <Link to="/Home">Home</Link>
        <Link to="/MatchesList">MatchesList</Link>
        <Link to="/StadiumsList">StadiumsList</Link>
        <Link to="/About">About</Link>
        <Link to="/TeamsList">TeamsList</Link>
        {
          user ? <Link onClick={logOut}>Logout</Link> : <Link to="/Login">Login</Link>
        }
      </nav>
    </div>
  )
}
export default Nav
