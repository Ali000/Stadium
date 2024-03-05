import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Client from '../services/api'

const Match = (props) => {
  const navigate = useNavigate()
  const [matchDetails, setMatchDetails] = useState({})
  // const [found, setFound] = useState(false)
  let { id } = useParams()
  let oldMatchDetails
  let from
  let to

  useEffect(() => {
    const getMatch = async () => {
      const response = await Client.get('/matches/' + id)
      console.log(response.data)
      oldMatchDetails = response.data
      from = new Date(response.data.time.from)
      to = new Date(response.data.time.to)
      response.data.time.from = `${from.getFullYear()}-${from.getMonth()}-${from.getDay()}`
      response.data.time.to = `${to.getFullYear()}-${to.getMonth()}-${to.getDay()}`
      setMatchDetails(response.data)
    }

    getMatch()
  }, [id, props])

  const buyticket = async () => {
    const response = await Client.post('/tickets/', {
      user: props.user.id,
      match: matchDetails._id,
      price: matchDetails.price
    })
    setMatchDetails((prev) => ({ ...prev, seats: prev.seats - 1 }))
    // navigate("/match/" + id)
  }
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
      {matchDetails?.seats > 0 ? (
        <>
          <h3>available seats: {matchDetails?.seats}</h3>
          <button onClick={buyticket}>buy a ticket</button>
        </>
      ) : (
        <div>no seats available</div>
      )}
    </div>
  )
}

export default Match
