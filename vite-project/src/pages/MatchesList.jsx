import { useEffect, useRef, useState } from 'react'
import Client from '../services/api'
import Search from '../components/Search'
import MatchCard from '../components/MatchCard'
import NewMatchCard from '../components/NewMatchCard'
const MatchesList = () => {
  const searchRef = useRef(null)
  const [searchResults, setSearchResults] = useState([])
  const [matches, setMatches] = useState([])
  const [pressed, setPresssed] = useState(false)
  useEffect(() => {
    Client.get('/matches')
      .then((response) => {
        setMatches(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    const searchTerm = searchRef.current.value.toLowerCase()
    const filteredMatches = matches.filter((match) =>
      match.name.toLowerCase().includes(searchTerm)
    )
    setSearchResults(filteredMatches)
    setPresssed(true)
  }
  return (
    <div>
      <Search onSubmit={handleSubmit} searchRef={searchRef} />
      <h1>Matches List</h1>
      <div className="container" key={Math.random()}>
        {pressed ? (
          searchResults.length > 0 ? (
            searchResults.map((match) => (
              <MatchCard key={match._id} match={match} />
            ))
          ) : (
            <h2>No Matches Found</h2>
          )
        ) : (
          matches.map((match) => (
            <>
              <MatchCard key={match._id} match={match} />
            </>
          ))
        )}
      </div>
      <NewMatchCard />
    </div>
  )
}
export default MatchesList
