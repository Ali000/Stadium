import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Client from "../services/api"
import NewMatchCard from "../components/NewMatchCard"

// const Match = ({ matchDetails, setMatchDetails, user }) => {
const Match = () => {
  const navigate = useNavigate()
  const [matchDetails, setMatchDetails] = useState({})
  // const [found, setFound] = useState(false)
  let { id } = useParams()
  let from
  let to

  useEffect(() => {
    const getMatch = async () => {
      const response = await Client.get("/matches/" + id)
      console.log(response.data)
      from = new Date(response.data.time.from)
      to = new Date(response.data.time.to)
      response.data.time.from = `${from.getFullYear()}-${from.getMonth()}-${from.getDay()}`
      response.data.time.to = `${to.getFullYear()}-${to.getMonth()}-${to.getDay()}`
      setMatchDetails(response.data)
    }

    getMatch()
  }, [id])
  return (
    <div>
      <h3>Name: {matchDetails.name} </h3>
      <h3>Stadium: {matchDetails?.stadium?.name} </h3>
      <h3>Teams: </h3>
      <h5>Team 1: {matchDetails?.teams?.home?.name}</h5>
      <h5>Team 2: {matchDetails?.teams?.away?.name}</h5>
      <h3>
        time: from: {matchDetails?.time?.from} to: {matchDetails?.time?.to}
      </h3>
      <h3>Price for the ticket: {matchDetails?.price}</h3>
    </div>
  )
}

{
  /* team 1 : {matchDetails ? matchDetails?.teams?.away?.name : null} */
}
{
  /* {found ? matchDetails.teams.away.name : "loading"} */
}
{
  /* {matchDetails &&
          matchDetails.team &&
          matchDetails.team.home &&
          matchDetails.team.away.name} */
}
{
  /* {matchDetails.team ? matchDetails.team.away.name : "loading"} */
}

export default Match
