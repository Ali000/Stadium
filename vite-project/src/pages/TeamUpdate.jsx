import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRef } from 'react'
import Client from '../services/api'
const TeamUpdate = () => {
  const nameRef = useRef(null)
  const sportRef = useRef(null)
  const playersRef = useRef(null)
  const [teamDetails, setTeamDetails] = useState({})
  const [teams, setTeams] = useState([])
  let { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    Client.get('/teams')
      .then((response) => {
        console.log(response)
        setTeams(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    getDetails()
  })
  const getDetails = () => {
    const filteredTeams = teams.find((team) => team._id === id)
    setTeamDetails(filteredTeams)
  }
  const handleUpdate = (e) => {
    e.preventDefault()
    Client.put(`/teams/${id}`, {
      name: nameRef.current.value,
      sport: sportRef.current.value,
      players: playersRef.current.value
    }).then((response) => {
      console.log(response)
      navigate('/Teamslist')
    })
    nameRef.current.value = null
    sportRef.current.value = null
    playersRef.current.value = null
  }
  return (
    <div>
      {teamDetails? (
        <div>
          <form
            onSubmit={handleUpdate}
          >
            <label htmlFor="text">
              Name:
            </label>
            <input
              defaultValue={teamDetails.name}
              type="text"
              id="name"
              ref={nameRef}
            />
            <label htmlFor="text">
              Sport:
            </label>
            <input
              type="text"
              id="sport"
              defaultValue={teamDetails.sport}
              ref={sportRef}
            />
            <label className="add-text" htmlFor="text">
              Players:
            </label>
            <input
              type="text"
              id="players"
              defaultValue={teamDetails.players}
              ref={playersRef}
            />
            <div className="flexa item">
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  )
}
export default TeamUpdate
