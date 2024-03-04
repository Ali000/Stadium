import { useEffect, useRef, useState } from "react"
import Client from "../services/api"
import Search from "../components/Search"
import StadiumCard from "../components/StadiumCard"
import NewStadiumCard from "../components/NewStadiumCard"
const StadiumsList = () => {
  const searchRef = useRef(null)
  const [searchResults, setSearchResults] = useState([])
  const [stadiums, setStadiums] = useState([])
  const [pressed, setPresssed] = useState(false)
  useEffect(() => {
    Client.get("/stadiums")
      .then((response) => {
        setStadiums(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    const searchTerm = searchRef.current.value.toLowerCase()
    const filteredTeams = stadiums.filter((stadium) =>
      stadium.name.toLowerCase().includes(searchTerm)
    )
    setSearchResults(filteredTeams)
    setPresssed(true)
  }

  return (
    <div>
      <Search onSubmit={handleSubmit} searchRef={searchRef} />
      <h1>Stadiums List</h1>
      <div className="container" key={Math.random()}>
        {pressed ? (
          searchResults.length > 0 ? (
            searchResults.map((stadium) => (
              <StadiumCard key={stadium._id} stadium={stadium} />
            ))
          ) : (
            <h2>No Stadiums Found</h2>
          )
        ) : (
          stadiums.map((stadium) => (
            <>
              <StadiumCard key={stadium._id} stadium={stadium} />
            </>
          ))
        )}
      </div>
      <NewStadiumCard />
    </div>
  )
}
export default StadiumsList
