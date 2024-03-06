import { useEffect, useRef, useState } from "react"
import Client from "../services/api"
import Search from "../components/Search"
import TeamCard from "../components/TeamCard"
import NewTeamCard from "../components/NewTeamCard"
const TeamsList = ({ user }) => {
  const searchRef = useRef(null)
  const [searchResults, setSearchResults] = useState([])
  const [teams, setTeams] = useState([])
  const [pressed, setPresssed] = useState(false)
  useEffect(() => {
    Client.get("/teams")
      .then((response) => {
        setTeams(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    const searchTerm = searchRef.current.value.toLowerCase()
    const filteredTeams = teams.filter((team) =>
      team.name.toLowerCase().includes(searchTerm)
    )
    setSearchResults(filteredTeams)
    setPresssed(true)
  }

  return (
    <div>
      {/* <Search onSubmit={handleSubmit} searchRef={searchRef} /> */}
      <h1 className="pages-title">Teams</h1>
      <div className="container" key={Math.random()}>
        {pressed ? (
          searchResults.length > 0 ? (
            searchResults.map((team) => <TeamCard key={team._id} team={team} />)
          ) : (
            <h2>No Teams Found</h2>
          )
        ) : (
          teams.map((team) => (
            <>
              <TeamCard key={team._id} team={team} user={user} />
            </>
          ))
        )}
      </div>
      {/* <NewTeamCard /> */}
    </div>
  )
}
export default TeamsList
