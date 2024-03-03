import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Client from '../services/api'
import Players from '../components/Players'
const Team = () => {
  const navigate = useNavigate()
  const [teamDetails, setTeamDetails] = useState({})
  let { id } = useParams()
  useEffect(() => {
    Client.get(`/teams/${id}`)
      .then((response) => {
        setTeamDetails(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])
  const handleDelete = () => {
    Client.delete(`/teams/${id}`, {}).then((response) => {
      navigate('/TeamsList')
    })
  }
  const handleUpdate = () => {
    navigate(`/Team/Update/${id}`)
  }
  return (
    <div>
      {teamDetails ? (
        <div>
          <h2>{teamDetails.name}</h2>
          <h4>Description:{teamDetails.sport}</h4>
          <Players players={teamDetails.players} />
          <div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default Team
