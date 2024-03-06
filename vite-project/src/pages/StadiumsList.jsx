import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
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
    <div className="Stadiums-List-Page">
      {/* <Search onSubmit={handleSubmit} searchRef={searchRef} />
       */}
      <NewStadiumCard />
      <h1 className="pages-title">Stadiums List</h1>
      <div className="container stadium-card-wrap">
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
            <div className="stadium-card-single" key={stadium._id}>
              <Link className="anchor-no-line" to={"/Stadium/" + stadium._id}>
                <StadiumCard key={stadium._id} stadium={stadium} />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
export default StadiumsList
